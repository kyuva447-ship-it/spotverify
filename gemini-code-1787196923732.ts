'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function FileUploader({ taskId, onComplete }: { taskId: string, onComplete: () => void }) {
  const supabase = createClient()
  const [uploading, setUploading] = useState(false)

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const filePath = `proofs/${taskId}-${Date.now()}.${file.name.split('.').pop()}`
    
    const { error: uploadError } = await supabase.storage
      .from('inspection-proofs')
      .upload(filePath, file)

    if (uploadError) {
      alert('Upload failed: ' + uploadError.message)
      setUploading(false)
      return
    }

    const { data: { publicUrl } } = supabase.storage
      .from('inspection-proofs')
      .getPublicUrl(filePath)

    const { error: updateError } = await supabase
      .from('tasks')
      .update({ status: 'verified', proof_image_url: publicUrl })
      .eq('id', taskId)

    if (!updateError) {
      onComplete()
    }
    setUploading(false)
  }

  return (
    <label className="cursor-pointer bg-amber-500 hover:bg-amber-400 text-black px-4 py-2 rounded-xl font-bold text-xs inline-block shadow-md">
      {uploading ? 'Processing Image...' : 'Capture Inspection Proof'}
      <input type="file" accept="image/*" capture="environment" onChange={handleFileUpload} className="hidden" />
    </label>
  )
}
