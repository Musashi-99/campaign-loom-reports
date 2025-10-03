import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

export default function RichTextEditor({ value, onChange, placeholder }: Props) {
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const exec = (command: string) => {
    document.execCommand(command, false);
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Button type="button" variant="outline" size="sm" onClick={() => exec("bold")}>Bold</Button>
        <Button type="button" variant="outline" size="sm" onClick={() => exec("italic")}>Italic</Button>
        <Button type="button" variant="outline" size="sm" onClick={() => exec("underline")}>Underline</Button>
      </div>
      <div
        ref={editorRef}
        className="min-h-[160px] rounded-md border border-input bg-background px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
        contentEditable
        data-placeholder={placeholder}
        onInput={() => {
          if (editorRef.current) onChange(editorRef.current.innerHTML);
        }}
        suppressContentEditableWarning
      />
    </div>
  );
}


