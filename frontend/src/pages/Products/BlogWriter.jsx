import React, { useState, useRef, useEffect } from 'react';
// import { qabotService } from '../../services/qabotService';
import { blogwiterService } from '../../services/blogwriterService';
import { Search } from 'lucide-react';

const PROMPT_TYPES = [
  { id: 'general', label: 'General' },
  { id: 'sales', label: 'Sales' },
  { id: 'support', label: 'Support' },
  { id: 'product', label: 'Product' }
];

const BlogWriter = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [promptType, setPromptType] = useState('general');
  const messagesEndRef = useRef(null);

  // ... (previous scrollToBottom and useEffect code remains the same)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setError(null);
    const userMessage = {
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
    //   const response = await qabotService.getResponse(userMessage.content, promptType);
      const response = await blogwiterService.getResponse(userMessage.content, promptType);
      
      const botMessage = {
        type: 'bot',
        content: response.response,
        timestamp: response.timestamp || new Date().toISOString()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to get response. Please try again.');
      const errorMessage = {
        type: 'error',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <Search className="w-6 h-6 text-blue-400" />
          <div>
            <h1 className="text-xl font-semibold">Blog Writer</h1>
            <p className="text-sm text-gray-500">
             Select mode & Ask questions and to get accurate answers instantly
            </p>
          </div>
        </div>
        <select
          value={promptType}
          onChange={(e) => setPromptType(e.target.value)}
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {PROMPT_TYPES.map(type => (
            <option key={type.id} value={type.id}>
              {type.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto p-4 bg-white rounded-lg shadow">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500">
            Start writing SEO-friendly blog by typing a topic below.
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={`${message.timestamp}-${index}`}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : message.type === 'error'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="break-words whitespace-pre-wrap">{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {error && (
        <div className="text-red-500 text-sm mb-2 px-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
      {/* Rest of the component remains the same... */}
    </div>
    
  );
};
export default BlogWriter;
// export default QaBot;