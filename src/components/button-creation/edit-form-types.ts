export interface EditFormProps<T> {
  onSave: (data: T) => void
  onCancel: () => void
  initialData: T
}
