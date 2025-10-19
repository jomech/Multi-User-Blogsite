'use client';

import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  return (
    <div className="grid grid-cols-2 gap-4 h-[600px]">
      {/* Editor */}
      <Card className="p-4">
        <h3 className="font-semibold mb-2">Editor</h3>
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write your markdown here..."
          className="h-[calc(100%-2rem)] font-mono resize-none"
        />
      </Card>

      {/* Preview */}
      <Card className="p-4 overflow-auto">
        <h3 className="font-semibold mb-2">Preview</h3>
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {value}
          </ReactMarkdown>
        </div>
      </Card>
    </div>
  );
}
