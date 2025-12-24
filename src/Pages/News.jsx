import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  CalendarDays,
  User,
  Clock,
  ArrowRight,
  ExternalLink,
  Tag,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  Share2,
  Bookmark,
  Loader2,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

const BlogSection = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [categories, setCategories] = useState([]);
  const [apiStats, setApiStats] = useState({ success: 0, failed: 0 });
  const [lastFetchTime, setLastFetchTime] = useState(null);

  const postsPerPage = 9;
  const blogRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const INSURANCE_QUERY =
    'insurance OR insurtech OR reinsurance OR underwriting OR claims OR health insurance OR life insurance';

  const API_CONFIGS = [
    {
      name: 'NewsAPI',
      url: `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        INSURANCE_QUERY
      )}&language=en&sortBy=publishedAt&apiKey=5b0af3d79916424481d9767a50cd6717`,
      transform: (data) =>
        data.articles?.map(article => ({
          id: `newsapi-${article.url}`,
          title: article.title,
          excerpt: article.description || 'No description available',
          content: article.content || article.description,
          author: article.author || 'Unknown Author',
          date: article.publishedAt,
          readTime: `${Math.max(
            2,
            Math.ceil((article.content?.length || 300) / 1000)
          )} min read`,
          category: 'Insurance',
          image:
            article.urlToImage ||
            'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop&q=80',
          source: article.source?.name,
          url: article.url,
          tags: ['Insurance', 'InsurTech', 'Finance']
        })) || []
    },

    {
      name: 'Guardian',
      url: `https://content.guardianapis.com/search?q=insurance&api-key=9b397605-f011-43d8-8ac0-ef93346fc445&show-fields=thumbnail,trailText,body&page-size=10`,
      transform: (data) =>
        data.response?.results?.map(article => ({
          id: `guardian-${article.id}`,
          title: article.webTitle,
          excerpt: article.fields?.trailText || 'No description available',
          content: article.fields?.body || article.fields?.trailText,
          author: 'The Guardian',
          date: article.webPublicationDate,
          readTime: `${Math.max(
            3,
            Math.ceil((article.fields?.body?.length || 500) / 1000)
          )} min read`,
          category: 'Insurance',
          image:
            article.fields?.thumbnail ||
            'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop&q=80',
          source: 'The Guardian',
          url: article.webUrl,
          tags: ['Insurance', 'Policy', 'Risk']
        })) || []
    },

    {
      name: 'NYTimes',
      url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=insurance&api-key=6AeQw2pt4WVzkKTy6fFDB7qIiMgIV3FZUIbOEqxZnRfK63qA`,
      transform: (data) =>
        data.response?.docs?.slice(0, 10).map(article => ({
          id: `nyt-${article._id}`,
          title: article.headline?.main,
          excerpt: article.abstract || 'No description available',
          content: article.lead_paragraph || article.abstract,
          author: article.byline?.original || 'New York Times',
          date: article.pub_date,
          readTime: `${Math.max(
            4,
            Math.ceil((article.abstract?.length || 600) / 1000)
          )} min read`,
          category: 'Insurance',
          image:
            article.multimedia?.[0]?.url
              ? `https://www.nytimes.com/${article.multimedia[0].url}`
              : 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop&q=80',
          source: 'New York Times',
          url: article.web_url,
          tags: ['Insurance', 'Risk Management', 'Finance']
        })) || []
    },

    {
      name: 'GNews',
      url: `https://gnews.io/api/v4/search?q=insurance&lang=en&apikey=963871356ba532833088d07c8e8d15c6`,
      transform: (data) =>
        data.articles?.map(article => ({
          id: `gnews-${article.url}`,
          title: article.title,
          excerpt: article.description || 'No description available',
          content: article.content || article.description,
          author: article.source?.name || 'GNews',
          date: article.publishedAt,
          readTime: `${Math.max(
            2,
            Math.ceil((article.content?.length || 300) / 1000)
          )} min read`,
          category: 'Insurance',
          image:
            article.image ||
            'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop&q=80',
          source: 'GNews',
          url: article.url,
          tags: ['Insurance', 'InsurTech', 'Global']
        })) || []
    },

    {
      name: 'MediaStack',
      url: `http://api.mediastack.com/v1/news?access_key=65fb09b9e9bbd39dbd81ebdcdb331747&keywords=insurance,insurtech,reinsurance&languages=en&limit=10`,
      transform: (data) =>
        data.data?.map(article => ({
          id: `mediastack-${article.url}`,
          title: article.title,
          excerpt: article.description || 'No description available',
          content: article.description,
          author: article.author || article.source || 'MediaStack',
          date: article.published_at,
          readTime: `${Math.max(
            2,
            Math.ceil((article.description?.length || 300) / 1000)
          )} min read`,
          category: 'Insurance',
          image:
            article.image ||
            'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop&q=80',
          source: article.source || 'MediaStack',
          url: article.url,
          tags: ['Insurance', 'Claims', 'Risk']
        })) || []
    }
  ];


  // Mock fallback data
  const MOCK_ARTICLES = [
    {
      id: 'mock-1',
      title: "Understanding Modern Insurance Policies",
      excerpt: "A comprehensive guide to navigating the complex world of insurance coverage.",
      content: "Insurance policies have evolved significantly in recent years. With new technologies and changing regulations, understanding your coverage has never been more important...",
      author: "Financial Times",
      date: new Date().toISOString(),
      readTime: "5 min read",
      category: "Insurance",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop&q=80",
      source: "Financial Times",
      url: "#",
      tags: ["Insurance", "Guide", "Finance"]
    },
    {
      id: 'mock-2',
      title: "Digital Transformation in Insurance",
      excerpt: "How technology is reshaping the insurance industry and improving customer experience.",
      content: "From AI-powered underwriting to blockchain-based claims processing, the insurance sector is undergoing a digital revolution...",
      author: "Tech Review",
      date: new Date(Date.now() - 86400000).toISOString(),
      readTime: "7 min read",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80",
      source: "Tech Review",
      url: "#",
      tags: ["Digital", "Technology", "Innovation"]
    },
    {
      id: 'mock-3',
      title: "Risk Management Strategies for 2024",
      excerpt: "Essential strategies for businesses to effectively manage and mitigate risks.",
      content: "Effective risk management is crucial for business sustainability. Learn about the latest strategies and tools...",
      author: "Business Weekly",
      date: new Date(Date.now() - 172800000).toISOString(),
      readTime: "6 min read",
      category: "Business",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop&q=80",
      source: "Business Weekly",
      url: "#",
      tags: ["Risk", "Business", "Management"]
    }
  ];

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = () => {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        setIsDark(savedTheme === "dark");
      }
    };

    window.addEventListener("themeChange", handleThemeChange);
    window.addEventListener("storage", handleThemeChange);

    return () => {
      window.removeEventListener("themeChange", handleThemeChange);
      window.removeEventListener("storage", handleThemeChange);
    };
  }, []);

  // Fetch articles from APIs
  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError(null);
    const stats = { success: 0, failed: 0 };
    const allArticles = [];
    const uniqueCategories = new Set(['all']);

    try {
      // Try fetching from configured APIs
      const apiPromises = API_CONFIGS.map(async (config) => {
        try {
          console.log(`Fetching from ${config.name}...`);
          const response = await fetch(config.url);

          if (!response.ok) {
            throw new Error(`${config.name}: ${response.status} ${response.statusText}`);
          }

          const data = await response.json();
          const transformed = config.transform(data);

          transformed.forEach(article => {
            uniqueCategories.add(article.category);
            allArticles.push(article);
          });

          stats.success++;
          console.log(`Successfully fetched ${transformed.length} articles from ${config.name}`);
        } catch (apiError) {
          console.warn(`Failed to fetch from ${config.name}:`, apiError.message);
          stats.failed++;
        }
      });

      await Promise.allSettled(apiPromises);
      setApiStats(stats);

      // If no articles were fetched, use mock data
      if (allArticles.length === 0) {
        console.log('No API data available, using mock articles');
        MOCK_ARTICLES.forEach(article => {
          uniqueCategories.add(article.category);
          allArticles.push(article);
        });
        stats.success = 1; // Count mock as success
      }

      // Sort articles by date (newest first)
      const sortedArticles = allArticles.sort((a, b) =>
        new Date(b.date) - new Date(a.date)
      );

      setArticles(sortedArticles);
      setFilteredArticles(sortedArticles);
      setCategories(Array.from(uniqueCategories));
      setLastFetchTime(new Date());

    } catch (error) {
      console.error('Error fetching articles:', error);
      setError('Failed to load articles. Please try again.');
      // Fallback to mock data
      MOCK_ARTICLES.forEach(article => {
        uniqueCategories.add(article.category);
      });
      setArticles(MOCK_ARTICLES);
      setFilteredArticles(MOCK_ARTICLES);
      setCategories(Array.from(uniqueCategories));
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // Filter articles based on search and category
  useEffect(() => {
    let filtered = articles;

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchLower) ||
        article.excerpt.toLowerCase().includes(searchLower) ||
        article.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article =>
        article.category === selectedCategory
      );
    }

    setFilteredArticles(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, articles]);

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredArticles.length / postsPerPage);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Handle article click
  const handleArticleClick = (article) => {
    if (article.url && article.url !== '#') {
      window.open(article.url, '_blank', 'noopener,noreferrer');
    } else {
      setSelectedArticle(article);
    }
  };

  // Article card component
  const ArticleCard = ({ article, index }) => (
    <div
      className={`group relative overflow-hidden rounded-xl cursor-pointer transform transition-all duration-300 hover:-translate-y-1 ${isDark
          ? 'bg-gray-900/50 hover:bg-gray-800/70 border border-gray-800'
          : 'bg-white hover:bg-gray-50 border border-gray-200'
        }`}
      onClick={() => handleArticleClick(article)}
    >
      {/* Image */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${isDark
              ? 'bg-green-600/20 text-green-400 border border-green-600/30'
              : 'bg-green-500/10 text-green-700 border border-green-500/20'
            }`}>
            {article.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1 text-sm">
            <CalendarDays className="w-4 h-4" />
            <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              {formatDate(article.date)}
            </span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Clock className="w-4 h-4" />
            <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              {article.readTime}
            </span>
          </div>
        </div>

        <h3 className={`text-lg sm:text-xl font-bold mb-3 line-clamp-2 ${isDark ? 'text-white group-hover:text-green-400' : 'text-gray-900 group-hover:text-green-600'
          } transition-colors`}>
          {article.title}
        </h3>

        <p className={`text-sm sm:text-base mb-4 line-clamp-3 ${isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className={`w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {article.author}
            </span>
          </div>

          <div className={`flex items-center gap-2 text-sm font-medium ${isDark ? 'text-green-400' : 'text-green-600'
            }`}>
            <span>Read More</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Hover Effects */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-green-500/20 rounded-xl transition-all duration-300 pointer-events-none" />
    </div>
  );

  return (
    <div className={isDark ? 'dark' : ''} id="blog">
      <section
        ref={blogRef}
        className={`relative py-16 md:py-24 overflow-hidden ${isDark ? 'bg-gray-950' : 'bg-gray-50'
          } transition-colors duration-500`}
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-blue-500 to-green-500" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-white text-sm font-medium">
              <span>Latest Insights</span>
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </div>

            <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 ${isDark ? 'text-white' : 'text-gray-900'
              }`}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">
                News & Insights
              </span>
            </h1>

            <p className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
              Stay updated with the latest news, insights, and analysis from the world of finance and insurance
            </p>
          </div>

          {/* Stats & Controls */}
          <div className={`mb-8 p-4 rounded-xl ${isDark ? 'bg-gray-900/50 border border-gray-800' : 'bg-white border border-gray-200'
            }`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${isDark
                      ? 'bg-gray-900 border-gray-800 text-white placeholder-gray-500 focus:border-green-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-green-500'
                    } transition-colors`}
                />
              </div>


            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                  : isDark
                    ? 'bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
            >
              All ({articles.length})
            </button>
            {categories
              .filter(cat => cat !== 'all')
              .slice(0, 8)
              .map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                      ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                      : isDark
                        ? 'bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                >
                  {category}
                </button>
              ))}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="w-12 h-12 animate-spin text-green-500 mb-4" />
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                Fetching latest articles...
              </p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className={`p-6 rounded-xl mb-8 ${isDark ? 'bg-red-900/20 border border-red-800' : 'bg-red-50 border border-red-200'
              }`}>
              <div className="flex items-center gap-3 mb-3">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Unable to load articles
                </h3>
              </div>
              <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {error}
              </p>
              <button
                onClick={fetchArticles}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
            </div>
          )}

          {/* Articles Grid */}
          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {currentArticles.map((article, index) => (
                  <ArticleCard key={article.id} article={article} index={index} />
                ))}
              </div>

              {/* No Results */}
              {currentArticles.length === 0 && (
                <div className="text-center py-16">
                  <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    No articles found
                  </h3>
                  <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg ${currentPage === 1
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      } ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-lg font-medium transition-all ${currentPage === pageNum
                            ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                            : isDark
                              ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
                              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                          }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-lg ${currentPage === totalPages
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      } ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Results Info */}
              <div className={`text-center mt-8 text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'
                }`}>
                Showing {indexOfFirstPost + 1}-{Math.min(indexOfLastPost, filteredArticles.length)} of {filteredArticles.length} articles
                {searchTerm && ` for "${searchTerm}"`}
                {selectedCategory !== 'all' && ` in ${selectedCategory}`}
              </div>
            </>
          )}
        </div>

        {/* Article Detail Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedArticle(null)}
            />

            <div
              className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl ${isDark ? 'bg-gray-900' : 'bg-white'
                }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10">
                <div className="relative h-64 overflow-hidden rounded-t-2xl">
                  <img
                    src={selectedArticle.image}
                    alt={selectedArticle.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'
                      } transition-colors`}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8">
                <div className="mb-6">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${isDark
                      ? 'bg-green-600/20 text-green-400 border border-green-600/30'
                      : 'bg-green-500/10 text-green-700 border border-green-500/20'
                    }`}>
                    {selectedArticle.category}
                  </span>
                </div>

                <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                  {selectedArticle.title}
                </h2>

                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <User className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                      {selectedArticle.author}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                      {formatDate(selectedArticle.date)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                      {selectedArticle.readTime}
                    </span>
                  </div>
                </div>

                <div className={`prose max-w-none mb-8 ${isDark ? 'prose-invert' : ''
                  }`}>
                  <p className="text-lg leading-relaxed">
                    {selectedArticle.content}
                  </p>
                </div>

                {selectedArticle.tags && selectedArticle.tags.length > 0 && (
                  <div className="mb-8">
                    <div className="flex flex-wrap gap-2">
                      {selectedArticle.tags.map((tag, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-full text-sm ${isDark
                              ? 'bg-gray-800 text-gray-300 border border-gray-700'
                              : 'bg-gray-100 text-gray-700 border border-gray-200'
                            }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-700/30">
                  <a
                    href={selectedArticle.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-4 rounded-xl font-semibold transition-all bg-gradient-to-r from-green-500 to-blue-500 hover:shadow-lg text-white text-center"
                  >
                    Read Full Article
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default BlogSection;