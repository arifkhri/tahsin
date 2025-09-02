'use client';

import { useState } from 'react';
import { Container, Card, Typography, Button } from '@/components/ui';
import { CaretLeftIcon } from '@phosphor-icons/react/dist/ssr/CaretLeft';
import { RadioButtonGroup } from '@/components/ui/radio-button-group';
import sifatData from '@/data/sifatData.json';
import sifatLahadidData from '@/data/sifatLahadidData.json';

interface SifatProps {
  onBack: () => void;
}

// Define proper types for the JSON data structure
interface ContentItem {
  type:
    | 'text'
    | 'arabic'
    | 'arabic_example'
    | 'arabic_letters'
    | 'arabic_phrase'
    | 'heading'
    | 'numbered_list';
  content:
    | string
    | { number: string; text: string; detail?: string; example?: string }[];
}

interface Section {
  id: string;
  title: string;
  content: ContentItem[];
}

interface SifatDataType {
  title: string;
  description: string;
  sections: Section[];
  quiz: {
    questions: Array<{
      id: string;
      type: 'multiple_choice';
      question: string;
      options: string[];
      correct: number;
      explanation: string;
    }>;
    essays: Array<{
      id: string;
      question: string;
      sample_answer: string;
    }>;
  };
}

export default function Sifat({ onBack }: SifatProps) {
  const [selectedCategory, setSelectedCategory] = useState<'sifat' | 'lahadid'>(
    'sifat'
  );
  const [showQuiz, setShowQuiz] = useState(false);

  const currentData = (
    selectedCategory === 'sifat' ? sifatData : sifatLahadidData
  ) as SifatDataType;

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value as 'sifat' | 'lahadid');
  };

  const renderContent = (content: ContentItem[]) => {
    return content.map((item, index) => {
      switch (item.type) {
        case 'text':
          return (
            <Typography key={index} variant="body" className="text-gray-700">
              {item.content as string}
            </Typography>
          );

        case 'arabic':
          return (
            <Card
              key={index}
              variant="outlined"
              className="bg-lime-50 border-l-4 border-lime-500 p-4 text-center"
            >
              <Typography
                variant="body"
                className="text-2xl font-arabic leading-loose text-gray-800"
              >
                {item.content as string}
              </Typography>
            </Card>
          );

        case 'arabic_example':
          return (
            <Card
              key={index}
              variant="outlined"
              className="bg-gray-100 border-l-4 border-gray-500 p-3 text-center"
            >
              <Typography
                variant="body"
                className="text-xl font-arabic text-gray-700"
              >
                {item.content as string}
              </Typography>
            </Card>
          );

        case 'arabic_letters':
          return (
            <Card
              key={index}
              variant="outlined"
              className="bg-gray-100 border-l-4 border-gray-500 p-4 text-center"
            >
              <Typography
                variant="body"
                className="text-xl font-arabic tracking-wider text-gray-800"
              >
                {item.content as string}
              </Typography>
            </Card>
          );

        case 'arabic_phrase':
          return (
            <Card
              key={index}
              variant="outlined"
              className="bg-lime-100 border-l-4 border-lime-500 p-4 text-center"
            >
              <Typography
                variant="body"
                className="text-2xl font-arabic font-semibold text-gray-800"
              >
                {item.content as string}
              </Typography>
            </Card>
          );

        case 'heading':
          return (
            <Typography
              key={index}
              variant="h3"
              className="text-gray-900 font-semibold mb-3 mt-6"
            >
              {item.content as string}
            </Typography>
          );

        case 'numbered_list':
          const listItems = item.content as {
            number: string;
            text: string;
            detail?: string;
            example?: string;
          }[];
          return (
            <div key={index} className="space-y-4">
              {listItems.map((listItem, listIndex) => (
                <Card
                  key={listIndex}
                  variant="outlined"
                  className="bg-gray-100 border-l-4 border-lime-500 p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-lime-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                      {listItem.number}
                    </div>
                    <div className="flex-1">
                      <Typography
                        variant="body"
                        className="text-gray-700 font-medium mb-2"
                      >
                        {listItem.text}
                      </Typography>
                      {listItem.detail && (
                        <Typography
                          variant="body"
                          className="text-gray-600 text-sm leading-relaxed mb-2"
                        >
                          {listItem.detail}
                        </Typography>
                      )}
                      {listItem.example && (
                        <Card variant="outlined" className="bg-white p-2">
                          <Typography
                            variant="body"
                            className="text-lg font-arabic text-center text-gray-800"
                          >
                            {listItem.example}
                          </Typography>
                        </Card>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          );

        default:
          return null;
      }
    });
  };

  const renderQuiz = () => {
    return (
      <div className="space-y-6">
        {/* Multiple Choice Questions */}
        <div>
          <Typography variant="h3" className="text-gray-900 font-semibold mb-4">
            Latihan Pilihan Ganda
          </Typography>
          <div className="space-y-4">
            {currentData.quiz.questions.map((question, index) => (
              <Card
                key={question.id}
                variant="outlined"
                className="bg-gray-100 border-l-4 border-gray-500 p-4"
              >
                <Typography
                  variant="body"
                  className="text-gray-800 font-medium mb-3"
                >
                  {index + 1}. {question.question}
                </Typography>
                <div className="space-y-2 mb-3">
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm">
                        {String.fromCharCode(65 + optionIndex)}
                      </span>
                      <Typography variant="body" className="text-gray-700">
                        {option}
                      </Typography>
                    </div>
                  ))}
                </div>
                <Card
                  variant="outlined"
                  className="bg-lime-100 border-l-4 border-lime-500 p-3"
                >
                  <Typography variant="body" className="text-lime-800">
                    <strong>Jawaban:</strong>{' '}
                    {String.fromCharCode(65 + question.correct)}
                  </Typography>
                  <Typography variant="body" className="text-lime-700 mt-1">
                    {question.explanation}
                  </Typography>
                </Card>
              </Card>
            ))}
          </div>
        </div>

        {/* Essay Questions */}
        <div>
          <Typography variant="h3" className="text-gray-900 font-semibold mb-4">
            Latihan Essay
          </Typography>
          <div className="space-y-4">
            {currentData.quiz.essays.map((essay, index) => (
              <Card
                key={essay.id}
                variant="outlined"
                className="bg-gray-100 border-l-4 border-gray-500 p-4"
              >
                <Typography
                  variant="body"
                  className="text-gray-800 font-medium mb-3"
                >
                  {index + 1}. {essay.question}
                </Typography>
                <Card
                  variant="outlined"
                  className="bg-lime-100 border-l-4 border-lime-500 p-3"
                >
                  <Typography variant="body" className="text-lime-800">
                    <strong>Contoh Jawaban:</strong>
                  </Typography>
                  <Typography variant="body" className="text-lime-700 mt-1">
                    {essay.sample_answer}
                  </Typography>
                </Card>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (showQuiz) {
    return (
      <Container size="lg" className="py-8">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => setShowQuiz(false)}
            className="flex items-center gap-2"
          >
            <CaretLeftIcon size={16} />
            Kembali ke Materi
          </Button>
        </div>

        <div className="mb-8">
          <Typography variant="h1" className="text-gray-900 mb-4">
            Latihan Soal - {currentData.title}
          </Typography>
        </div>

        {renderQuiz()}
      </Container>
    );
  }

  return (
    <Container size="lg" className="py-8">
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <CaretLeftIcon size={16} />
          Kembali ke Menu
        </Button>
      </div>

      <div className="mb-8">
        <Typography variant="h1" className="text-gray-900 mb-4">
          {currentData.title}
        </Typography>
        <Typography variant="body" className="text-gray-600">
          {currentData.description}
        </Typography>
      </div>

      {/* Category Filter */}
      <Card variant="outlined" className="mb-8 p-6">
        <Typography variant="h3" className="text-gray-900 mb-4">
          Pilih Kategori Sifat
        </Typography>
        <RadioButtonGroup
          name="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          layout="grid"
          columns={1}
          options={[
            {
              label: 'Sifat Umum - Definisi, faedah, dan pembagian sifat',
              value: 'sifat',
            },
            {
              label: 'Sifat Zatiyah Lahadid - Sifat yang memiliki lawan',
              value: 'lahadid',
            },
          ]}
          className="gap-4"
        />
      </Card>

      {/* Content Sections */}
      <div className="space-y-8 mb-8">
        {currentData.sections.map(section => (
          <Card key={section.id} variant="outlined" className="p-6">
            <Typography variant="h2" className="text-gray-900 mb-6">
              {section.title}
            </Typography>
            <div className="space-y-4">{renderContent(section.content)}</div>
          </Card>
        ))}
      </div>

      {/* Quiz Button */}
      <div className="text-center">
        <Button
          variant="primary"
          onClick={() => setShowQuiz(true)}
          className="bg-lime-600 hover:bg-lime-700 text-white"
        >
          Mulai Latihan Soal
        </Button>
      </div>
    </Container>
  );
}
