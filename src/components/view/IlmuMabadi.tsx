'use client';

import { useState } from 'react';
import { Container, Card, Typography, Button } from '@/components/ui';
import { CaretLeftIcon } from '@phosphor-icons/react/dist/ssr/CaretLeft';
import Quiz from '@/components/Quiz';
import ilmuMabadiData from '@/data/ilmuMabadiData.json';

interface IlmuMabadiProps {
  onBack: () => void;
}

// Define proper types for the JSON data structure
interface ContentDetail {
  type: string;
  description: string;
  style: 'error' | 'warning' | 'info' | 'success';
}

interface ContentItem {
  label?: string;
  text?: string;
  title?: string;
  details?: ContentDetail[];
  items?: string[];
  type?: 'grid' | 'list';
  style?: 'error' | 'warning' | 'info' | 'success';
}

interface Section {
  id: string;
  title: string;
  content: ContentItem[];
}

interface IlmuMabadiData {
  title: string;
  sections: Section[];
  quiz: Array<{
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }>;
  essayQuestions: Array<{
    id: number;
    question: string;
    sampleAnswer: string;
    keyPoints: string[];
  }>;
}

export default function IlmuMabadi({ onBack }: IlmuMabadiProps) {
  const [showQuiz, setShowQuiz] = useState(false);

  const data = ilmuMabadiData as IlmuMabadiData;

  const renderContent = (content: ContentItem[]) => {
    return content.map((item, index) => {
      if (item.label && item.text) {
        // Label-text pair
        return (
          <Typography key={index} variant="body" className="text-gray-700">
            <strong>{item.label}:</strong> {item.text}
          </Typography>
        );
      } else if (item.text) {
        // Simple text
        return (
          <Typography key={index} variant="body" className="text-gray-700">
            {item.text}
          </Typography>
        );
      } else if (item.title && item.details) {
        // Complex item with details (like Lahn types)
        return (
          <div key={index}>
            <Typography variant="body" className="text-gray-900 mb-4">
              {item.title}
            </Typography>
            <div className="ml-4 space-y-4">
              {item.details.map((detail, detailIndex) => (
                <Card
                  key={detailIndex}
                  variant="outlined"
                  className={`${
                    detail.style === 'error'
                      ? 'bg-red-200 border-l-4 border-red-500'
                      : detail.style === 'warning'
                        ? 'bg-amber-200 border-l-4 border-amber-500'
                        : 'bg-gray-100 border-l-4 border-gray-500'
                  } p-4`}
                >
                  <Typography variant="body" className="text-gray-700">
                    <strong>{detail.type}:</strong> {detail.description}
                  </Typography>
                </Card>
              ))}
            </div>
          </div>
        );
      } else if (item.title && item.items) {
        // Items with title (like Hukum section)
        return (
          <Card
            key={index}
            variant="outlined"
            className={`${
              item.style === 'success'
                ? 'bg-green-100 border-l-4 border-green-500'
                : item.style === 'info'
                  ? 'bg-lime-100 border-l-4 border-lime-500'
                  : 'bg-gray-100 border-l-4 border-gray-500'
            } p-4`}
          >
            <Typography
              variant="body"
              className="text-gray-900 font-semibold mb-2"
            >
              {item.title}
            </Typography>
            <div className="space-y-2">
              {item.items.map((subItem, subIndex) => (
                <Typography
                  key={subIndex}
                  variant="body"
                  className="text-gray-700"
                >
                  • {subItem}
                </Typography>
              ))}
            </div>
          </Card>
        );
      } else if (item.type === 'grid' && item.items) {
        // Grid layout for items
        return (
          <div key={index} className="grid grid-cols-2 gap-3">
            {item.items.map((gridItem, gridIndex) => (
              <Card
                key={gridIndex}
                variant="outlined"
                className="p-3 text-center"
              >
                <Typography variant="body" className="text-gray-700">
                  {gridItem}
                </Typography>
              </Card>
            ))}
          </div>
        );
      } else if (item.type === 'list' && item.items) {
        // Simple list
        return (
          <div key={index} className="space-y-2">
            {item.items.map((listItem, listIndex) => (
              <Typography
                key={listIndex}
                variant="body"
                className="text-gray-700"
              >
                • {listItem}
              </Typography>
            ))}
          </div>
        );
      }
      return null;
    });
  };

  if (showQuiz) {
    return (
      <Quiz
        title={data.title}
        questions={data.quiz}
        essayQuestions={data.essayQuestions}
        onBack={() => setShowQuiz(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      <Container size="lg" className="py-6">
        {/* Header */}
        <div className="flex items-center mb-8 w-full">
          <Button
            className="flex-none"
            size="icon"
            variant="ghost"
            onClick={onBack}
          >
            <CaretLeftIcon size={25} />
          </Button>
          <Typography
            variant="h3"
            className="text-gray-900 text-center flex-1 grow"
          >
            Mabadi Ilmu Tajwid
          </Typography>
        </div>

        {/* Content */}
        <div className="space-y-6 flex flex-col">
          {/* Dynamic sections from JSON */}
          {data.sections.map(section => (
            <Card key={section.id} variant="elevated" className="p-6">
              <Typography
                variant="h4"
                className="text-gray-900 mb-6 flex items-center"
              >
                <span className="bg-gray-100 text-gray-900 rounded-xl w-8 h-8 flex items-center justify-center text-lg font-bold mr-4">
                  {section.id}
                </span>
                {section.title}
              </Typography>
              <div className="space-y-4">{renderContent(section.content)}</div>
            </Card>
          ))}
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowQuiz(true)}
            className="grow"
          >
            Quiz Materi
          </Button>
        </div>
      </Container>
    </div>
  );
}
