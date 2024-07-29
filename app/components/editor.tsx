'use client';

import { RichTextEditor } from '@mantine/tiptap';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { useEditor, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import { Button } from '@mantine/core';

import { useState, useEffect } from 'react';

import axios from 'axios';

import './editor.css';

interface BlogPost {
  text: string;
}

const EditPage = () => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get('http://habitat:3001/xrpc/com.atproto.repo.getRecord', {
          params: {
            repo: 'did:plc:3wff4wcyfnjsxd2d2yz3azrj',
            collection: 'com.habitat.blog.post',
            rkey: '3ktiktrp54k2v',
          },
        });

        setPost(response.data.value);
      } catch (err) {
        setError('Error fetching blog post');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, []);

  const editor = useEditor(
    {
      extensions: [
        Color.configure({ types: [TextStyle.name, ListItem.name] }),
        TextStyle.configure({}),
        StarterKit.configure({
          bulletList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
          },
          orderedList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
          },
        }),
      ],
      content: post?.text,
    },
    [post]
  );

  const handleUpdate = async () => {
    const editedContent = editor?.getHTML();

    try {
      await axios.post(
        'http://habitat:3001/xrpc/com.atproto.repo.putRecord',
        {
          repo: 'did:plc:3wff4wcyfnjsxd2d2yz3azrj',
          collection: 'com.habitat.blog.post',
          rkey: '3ktiktrp54k2v',
          record: {
            text: editedContent,
            createdAt: '1985-04-12T23:20:50.123Z',
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzY29wZSI6ImNvbS5hdHByb3RvLmFjY2VzcyIsImF1ZCI6ImRpZDp3ZWI6bG9jYWxob3N0Iiwic3ViIjoiZGlkOnBsYzozd2ZmNHdjeWZuanN4ZDJkMnl6M2F6cmoiLCJpYXQiOjE3MTczMDg3NDMsImV4cCI6MTcxNzMxNTk0M30.VKx3w-ncNg6s389anh5mHcII6QKKwmMhWNgcf3d03h0',
          },
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="editor-container">Loading...</div>;
  }

  if (error) {
    return <div className="editor-container">{error}</div>;
  }

  return (
    <div className="editor-container">
      <div className="editor-heading">
        <h2>Hola</h2>
        <Button
          variant="filled"
          classNames={{
            root: 'save-button',
          }}
          onClick={() => {
            handleUpdate();
          }}
        >
          Save
        </Button>
      </div>
      {editor && <BlogEditor tiptapEditor={editor} />}
    </div>
  );
};

interface BlogEditorProps {
  tiptapEditor: Editor;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ tiptapEditor }) => (
  <RichTextEditor editor={tiptapEditor} style={{ width: '50%' }}>
    <RichTextEditor.Toolbar sticky stickyOffset={60}>
      <RichTextEditor.ControlsGroup>
        <RichTextEditor.Bold />
        <RichTextEditor.Italic />
        <RichTextEditor.Underline />
        <RichTextEditor.Strikethrough />
        <RichTextEditor.ClearFormatting />
        <RichTextEditor.Highlight />
        <RichTextEditor.Code />
      </RichTextEditor.ControlsGroup>

      <RichTextEditor.ControlsGroup>
        <RichTextEditor.H1 />
        <RichTextEditor.H2 />
        <RichTextEditor.H3 />
        <RichTextEditor.H4 />
      </RichTextEditor.ControlsGroup>

      <RichTextEditor.ControlsGroup>
        <RichTextEditor.Blockquote />
        <RichTextEditor.Hr />
        <RichTextEditor.BulletList />
        <RichTextEditor.OrderedList />
        <RichTextEditor.Subscript />
        <RichTextEditor.Superscript />
      </RichTextEditor.ControlsGroup>

      <RichTextEditor.ControlsGroup>
        <RichTextEditor.Link />
        <RichTextEditor.Unlink />
      </RichTextEditor.ControlsGroup>

      <RichTextEditor.ControlsGroup>
        <RichTextEditor.AlignLeft />
        <RichTextEditor.AlignCenter />
        <RichTextEditor.AlignJustify />
        <RichTextEditor.AlignRight />
      </RichTextEditor.ControlsGroup>

      <RichTextEditor.ControlsGroup>
        <RichTextEditor.Undo />
        <RichTextEditor.Redo />
      </RichTextEditor.ControlsGroup>
    </RichTextEditor.Toolbar>

    <RichTextEditor.Content />
  </RichTextEditor>
);

export default EditPage;
