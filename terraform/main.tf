provider "aws" {
  region = "us-east-1"
}

terraform {
  backend "s3" {
    bucket = ""
    key    = "soundboard/site.tfstate"
    region = "us-east-1"
  }
}

locals {
  site_url                = "bestsoundboard.com"
  website_endpoint_suffix = "s3-website-us-east-1.amazonaws.com"
  s3_origin_id            = "S3-Website-${local.site_url}.${local.website_endpoint_suffix}"

  s3_website_endpoint = "${local.site_url}.${local.website_endpoint_suffix}"
}

resource "aws_s3_bucket" "site_bucket" {
  bucket = "${local.site_url}"
  acl    = "public-read"

  policy = <<EOF
{
  "Id": "bucket_policy_site",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "bucket_policy_site_main",
      "Action": [
        "s3:GetObject"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::${local.site_url}/*",
      "Principal": "*"
    }
  ]
}
EOF

  website {
    index_document = "index.html"
    error_document = "404.html"
  }

  tags {}

  force_destroy = true
}

data "aws_acm_certificate" "cert" {
  domain   = "${local.site_url}"
  types    = ["AMAZON_ISSUED"]
  statuses = ["ISSUED"]
}

resource "aws_cloudfront_distribution" "cloudfront" {
  origin {
    domain_name = "${local.s3_website_endpoint}"
    origin_id   = "${local.s3_origin_id}"

    custom_origin_config {
      origin_protocol_policy = "http-only"
      http_port              = 80
      https_port             = 443
      origin_ssl_protocols   = ["TLSv1.2", "TLSv1.1", "TLSv1"]
    }
  }

  enabled         = true
  is_ipv6_enabled = true

  default_root_object = "index.html"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  aliases = ["${local.site_url}", "www.${"${local.site_url}"}"]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "${local.s3_origin_id}"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    compress               = true
  }

  price_class = "PriceClass_100"

  viewer_certificate {
    ssl_support_method  = "sni-only"
    acm_certificate_arn = "${data.aws_acm_certificate.cert.arn}"
  }
}

data "aws_route53_zone" "zone" {
  name = "${local.site_url}."
}

resource "aws_route53_record" "www" {
  zone_id = "${data.aws_route53_zone.zone.zone_id}"
  name    = "www.${local.site_url}"
  type    = "A"

  alias {
    name                   = "${aws_cloudfront_distribution.cloudfront.domain_name}"
    zone_id                = "${aws_cloudfront_distribution.cloudfront.hosted_zone_id}"
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "default" {
  zone_id = "${data.aws_route53_zone.zone.zone_id}"
  name    = "${local.site_url}"
  type    = "A"

  alias {
    name                   = "${aws_cloudfront_distribution.cloudfront.domain_name}"
    zone_id                = "${aws_cloudfront_distribution.cloudfront.hosted_zone_id}"
    evaluate_target_health = false
  }
}
