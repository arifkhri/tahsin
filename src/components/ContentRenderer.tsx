'use client';

import { useState } from 'react';
import { Container, Card, Typography, Button } from '@/components/ui';
import { CaretLeftIcon } from '@phosphor-icons/react/dist/ssr/CaretLeft';
import Quiz from '@/components/Quiz';

interface ContentItem {
  label?: string;
  text?: string;
  title?: string;
  details?: Array<{
    type: string;
    description: string;
    style: string;
  }>;
  items?: string[];
  style?: string;
  type?: string;
}

interface ContentSection {
  id: string;
  title: string;
  content: ContentItem[];
}

interface LearningMaterial {
  title: string;
  sections: ContentSection[];
  quiz: Array<{
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }>;
}

interface ContentRendererProps {
  data: LearningMaterial;
  onBack: () => void;
}

export default function ContentRenderer({
  data,
  onBack,
}: ContentRendererProps) {
  const [showQuiz, setShowQuiz] = useState(false);

  if (showQuiz) {
    return (
      <Quiz
        title={data.title}
        questions={data.quiz}
        onBack={() => setShowQuiz(false)}
      />
    );
  }

  const renderContentItem = (item: ContentItem, index: number) => {
    // Handle grid layout for items like names
    if (item.type === 'grid' && item.items) {
      return (
        <div key={index} className="grid grid-cols-2 gap-4">
          {item.items.map((gridItem, gridIndex) => (
            <Card
              key={gridIndex}
              variant="outlined"
              className="bg-lime-200 p-4 text-center"
            >
              <Typography variant="body" className="font-medium">
                {gridItem}
              </Typography>
            </Card>
          ))}
        </div>
      );
    }

    // Handle list layout
    if (item.type === 'list' && item.items) {
      return (
        <div key={index} className="grid grid-cols-1 gap-4">
          {item.items.map((listItem, listIndex) => (
            <Card
              key={listIndex}
              variant="outlined"
              className="bg-lime-200 p-6"
            >
              <Typography
                variant="body"
                className="text-gray-900 font-semibold"
              >
                • {listItem}
              </Typography>
            </Card>
          ))}
        </div>
      );
    }

    // Handle items with details (like Lahn types)
    if (item.details) {
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
                className={`p-4 border-l-4 ${
                  detail.style === 'error'
                    ? 'bg-red-200 border-red-500'
                    : 'bg-amber-200 border-amber-500'
                }`}
              >
                <Typography variant="body" className="text-gray-700">
                  <strong>{detail.type}:</strong> {detail.description}
                </Typography>
              </Card>
            ))}
          </div>
        </div>
      );
    }

    // Handle items with sub-items (like hukum)
    if (item.items && item.title) {
      return (
        <Card
          key={index}
          variant="outlined"
          className={`p-6 border-l-4 ${
            item.style === 'success'
              ? 'bg-emerald-200 border-emerald-500'
              : item.style === 'info'
                ? 'bg-sky-200 border-sky-500'
                : 'bg-gray-100 border-gray-300'
          }`}
        >
          <Typography variant="h5" className="text-gray-800 mb-3">
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
    }

    // Handle simple text with label
    if (item.label && item.text) {
      return (
        <Typography key={index} variant="body" className="text-gray-700">
          <strong>{item.label}:</strong> {item.text}
        </Typography>
      );
    }

    // Handle simple text
    if (item.text) {
      return (
        <Typography key={index} variant="body" className="text-gray-700">
          {item.text}
        </Typography>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen">
      <Container size="lg" className="py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 w-full">
          <Button size="icon" variant="ghost" onClick={onBack}>
            <CaretLeftIcon size={25} />
          </Button>
          <Typography variant="h3" className="text-gray-900 text-right flex-1">
            {data.title}
          </Typography>
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>

        {/* Content */}
        <div className="space-y-6">
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

              <div className="space-y-4">
                {section.content.map((item, index) =>
                  renderContentItem(item, index)
                )}
              </div>
            </Card>
          ))}

          {/* Quiz Button */}
          <Card variant="elevated" className="p-6 text-center">
            <Typography variant="h4" className="text-gray-900 mb-4">
              Uji Pemahaman Anda
            </Typography>
            <Typography variant="body" className="text-gray-600 mb-6">
              Tes pengetahuan Anda tentang {data.title} dengan quiz interaktif
            </Typography>
            <Button
              variant="default"
              size="lg"
              onClick={() => setShowQuiz(true)}
              className="w-full max-w-xs"
            >
              Mulai Quiz
            </Button>
          </Card>
        </div>
      </Container>
    </div>
  );
}
