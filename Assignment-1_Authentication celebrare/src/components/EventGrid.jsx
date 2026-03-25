import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const SkeletonCard = () => (
    <div className="animate-pulse bg-white h-44 rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
      <div>
        <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-100 rounded-md w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-50 rounded-md w-1/3"></div>
      </div>
      <div className="h-6 bg-gray-100 rounded-md w-1/4 self-start"></div>
    </div>
  );

const EventCard = ({ event }) => {
  const { lastClickedId, handleCardClick } = useContext(AuthContext);
  const isLastClicked = lastClickedId === event.id;

  return (
    <div
      onClick={() => handleCardClick(event.id)}
      className={`group cursor-pointer p-6 rounded-xl border transition-all duration-300 transform hover:-translate-y-1 ${
        isLastClicked 
          ? "border-blue-500 bg-blue-50 ring-2 ring-blue-400 ring-opacity-20 shadow-md scale-[1.02]" 
          : "border-gray-100 bg-white hover:border-blue-200 hover:shadow-lg shadow-sm"
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className={`font-bold text-xl transition-colors ${isLastClicked ? 'text-blue-700' : 'text-gray-800'}`}>
            {event.name}
        </h3>
        {isLastClicked && (
            <span className="text-blue-500 bg-blue-100 px-2.5 py-1 rounded-full text-[10px] uppercase font-black animate-pulse">
                Active
            </span>
        )}
      </div>
      
      <div className="space-y-2 mb-4">
        <p className="text-gray-500 text-sm flex items-center">
          <svg className="w-4 h-4 mr-2 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          {event.location}
        </p>
        <p className="text-gray-400 text-sm font-medium flex items-center">
            <svg className="w-4 h-4 mr-2 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            {event.date}
        </p>
      </div>

      <div className={`mt-auto inline-block px-3 py-1.5 text-xs font-bold rounded-lg ${
          isLastClicked ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-100 text-gray-600'
      }`}>
        {event.category}
      </div>
    </div>
  );
};

const EventGrid = () => {
    const { events, isEventsLoading, searchQuery, setSearchQuery } = useContext(AuthContext);
  
    if (isEventsLoading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      );
    }
  
    return (
      <div>
        <div className="mb-10 group">
          <div className="relative">
            <input
              type="text"
              placeholder="Filter events by name..."
              className="w-full h-14 p-4 pl-12 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all placeholder:text-gray-400 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute left-4 top-4.5 text-gray-300 group-focus-within:text-blue-500 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          {searchQuery && (
              <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-4 text-gray-300 hover:text-gray-500"
              >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
          )}
        </div>
        <p className="mt-2 text-xs text-gray-400 font-medium ml-1">
            {searchQuery ? `Found ${events.length} records matching your query` : 'Showing all records from global store'}
        </p>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <h3 className="text-xl font-bold text-gray-700">No results found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your search terms</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventGrid;
