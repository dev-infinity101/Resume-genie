'use client'

import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { UploadCloud, FileText, AlertTriangle, CheckCircle2, X } from 'lucide-react'
import { Button } from './ui/button'
import { apiClient } from '@/lib/api'
import Spinner from './ui/spinner'

interface FileUploadProps {
  onUploadSuccess: (data: {
    filename: string
    text_preview: string
    full_text: string
    character_count: number
  }) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

export default function FileUpload({ onUploadSuccess, isLoading, setIsLoading }: FileUploadProps) {
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setError(null)
    setFileName(file.name)
    setIsLoading(true)

    try {
      const result = await apiClient.uploadResume(file)
      onUploadSuccess(result)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [onUploadSuccess, setIsLoading])

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
    disabled: isLoading,
  })

  const borderColor = isDragReject
    ? 'border-red-500'
    : isDragActive
    ? 'border-blue-500'
    : 'border-gray-300'

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center space-y-6">
      <div
        {...getRootProps()}
        className={`w-full p-8 border-2 border-dashed ${borderColor} rounded-xl text-center cursor-pointer transition-all duration-300 bg-gray-50 hover:bg-gray-100`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-4 text-gray-600">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
            <UploadCloud className="w-8 h-8 text-gray-500" />
          </div>
          <p className="text-lg font-medium">
            {isDragActive ? 'Drop the file here ...' : 'Drag & drop your resume PDF here'}
          </p>
          <p className="text-sm text-gray-500">or</p>
          <Button variant="outline" disabled={isLoading} className="bg-white">
            Browse Files
          </Button>
          <p className="text-xs text-gray-400 pt-2">PDF only, max 10MB</p>
        </div>
      </div>

      {isLoading && (
        <div className="w-full flex items-center space-x-3 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <Spinner className="w-6 h-6" />
          <div className="flex-1">
            <p className="font-medium text-blue-800">Processing Resume</p>
            <p className="text-sm text-blue-600 truncate">Analyzing: {fileName}</p>
          </div>
        </div>
      )}

      {error && (
        <div className="w-full flex items-start space-x-3 bg-red-50 border border-red-200 rounded-lg p-4">
          <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-medium text-red-800">Upload Failed</p>
            <p className="text-sm text-red-600">{error}</p>
          </div>
          <button onClick={() => setError(null)} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  )
}