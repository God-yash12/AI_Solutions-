import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Lightbulb, 
  Trophy, 
  Code, 
  Brain, 
  Eye, 
  MessageSquare, 
  GraduationCap, 
  LineChart, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';
import PrimaryButton from '../../button/primary-button';
import AboutPageImage from "../../../assets/images/AboutPage.png";

// Custom hook for counter animation
const useCounter = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;
    
    const startValue = 0;
    const endValue = parseInt(end);

    const animation = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const currentCount = Math.floor(progress * (endValue - startValue) + startValue);
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animation);
      } else {
        setCount(endValue);
      }
    };

    animationFrame = requestAnimationFrame(animation);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isVisible]);

  return { count, counterRef };
};

// Service Card Component with animation
const ServiceCard = ({ title, icon: Icon, description, details }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`bg-white p-6 rounded-lg shadow-lg transform transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <div className="flex items-center mb-4">
        <Icon className="w-8 h-8 text-blue-600 mr-3" />
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      {details && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
        >
          {isExpanded ? (
            <>Show Less <ChevronUp className="ml-1 w-4 h-4" /></>
          ) : (
            <>Learn More <ChevronDown className="ml-1 w-4 h-4" /></>
          )}
        </button>
      )}
      {isExpanded && details && (
        <div className="mt-4 space-y-2 text-gray-600">
          {details.map((detail, index) => (
            <p key={index} className="flex items-start">
              <span className="mr-2">•</span>
              <span>{detail}</span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

// Stat Card Component
const StatCard = ({ number, text, suffix }) => {
  const { count, counterRef } = useCounter(number);
  
  return (
    <div ref={counterRef} className="text-center">
      <div className="text-4xl font-bold text-blue-600">
        {count}{suffix}
      </div>
      <div className="mt-2 text-gray-600">{text}</div>
    </div>
  );
};

// Value Card Component with animation
const ValueCard = ({ icon: Icon, title, description }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`flex flex-col items-center text-center p-6 transform transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <Icon className="w-12 h-12 text-blue-600 mb-4" />
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

// Main About Us Page Component
const AboutUsPage = () => {
  const navigate = useNavigate();

  // Stats data
  const stats = [
    { number: '2', text: 'Years Experience', suffix: '+' },
    { number: '500', text: 'Projects Completed', suffix: '+' },
    { number: '100', text: 'Team Members', suffix: '+' },
    { number: '50', text: 'Countries Served', suffix: '+' },
  ];

  // Services data
  const servicesData = [
    {
      title: 'Custom AI Software Development',
      icon: Code,
      description: 'Bespoke AI solutions tailored to your specific business needs with seamless integration.',
      details: [
        'End-to-end AI application development',
        'Integration with existing systems',
        'Scalable cloud solutions',
        'Real-time processing systems'
      ]
    },
    {
      title: 'Machine Learning Model Creation',
      icon: Brain,
      description: 'Advanced ML models for predictive modeling, pattern recognition, and data classification.',
      details: [
        'Custom model development',
        'Model optimization',
        'Transfer learning',
        'AutoML solutions'
      ]
    },
    {
      title: 'Computer Vision Solutions',
      icon: Eye,
      description: 'State-of-the-art computer vision for image recognition, object detection, and visual inspection.',
      details: [
        'Object detection systems',
        'Image classification',
        'Video analytics',
        'Quality control systems'
      ]
    },
    {
      title: 'Natural Language Processing',
      icon: MessageSquare,
      description: 'Advanced NLP solutions for text analysis, chatbots, and language understanding.',
      details: [
        'Text analysis systems',
        'Chatbot development',
        'Language translation',
        'Document processing'
      ]
    },
    {
      title: 'AI Education and Consulting',
      icon: GraduationCap,
      description: 'Expert guidance and training to help organizations implement AI successfully.',
      details: [
        'AI readiness assessment',
        'Training programs',
        'Implementation planning',
        'Strategy development'
      ]
    },
    {
      title: 'AI-Powered Predictive Analytics',
      icon: LineChart,
      description: 'Transform data into actionable insights with advanced predictive analytics.',
      details: [
        'Predictive modeling',
        'Business intelligence',
        'Risk assessment',
        'Performance optimization'
      ]
    }
  ];

  // Values data
  const valuesData = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Constantly exploring new technologies and solutions'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Working together to achieve exceptional results'
    },
    {
      icon: Trophy,
      title: 'Excellence',
      description: 'Delivering the highest quality in everything we do'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 mt-10">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">About AI-Solutions</h1>
            <p className="mt-4 text-xl text-gray-600">
              Pioneering AI Innovation in the Digital Age
            </p>
          </div>
        </div>
      </div>

      {/* Company Overview */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
            <p className="text-lg text-gray-600 mb-6">
              Founded in Sunderland, AI-Solutions stands at the forefront of artificial intelligence innovation,
              delivering cutting-edge solutions that transform the digital employee experience.
            </p>
            <p className="text-lg text-gray-600">
              Our mission is to empower businesses worldwide through intelligent automation and AI-driven
              technologies that enhance productivity, innovation, and growth.
            </p>
          </div>
          <div className="relative h-64 rounded-lg overflow-hidden">
            <img
              src={AboutPageImage}
              alt="AI-Solutions Office"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                number={stat.number}
                text={stat.text}
                suffix={stat.suffix}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              icon={service.icon}
              description={service.description}
              details={service.details}
            />
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {valuesData.map((value, index) => (
              <ValueCard
                key={index}
                icon={value.icon}
                title={value.title}
                description={value.description}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-blue-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl text-white mb-8">Contact us to schedule a demo or discuss your requirements</p>
          <PrimaryButton
            onClick={() => navigate("/contact")}
            className="px-8 py-3 rounded-lg font-bold transition-colors"
          >
            Contact Us
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;