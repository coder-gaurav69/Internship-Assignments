import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const EventGrid = () => {
  const {
    events,
    isEventsLoading,
    searchQuery,
    setSearchQuery,
    lastClickedId,
    handleCardClick,
  } = useContext(AuthContext);

  if (isEventsLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-44 animate-pulse rounded-xl border border-gray-100 bg-white p-6"
          >
            <div className="mb-4 h-5 w-3/4 rounded bg-gray-200" />
            <div className="mb-2 h-4 w-1/2 rounded bg-gray-100" />
            <div className="h-4 w-1/3 rounded bg-gray-100" />
          </div>
        ))}
      </div>
    );
  }

  const hasEvents = events.length > 0;

  return (
    <div>
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Filter events by name..."
              className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 pr-14 text-sm focus:border-blue-400 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-sm text-gray-500 hover:bg-gray-100"
              >
                Clear
              </button>
            )}
          </div>
          <p className="mt-2 text-xs text-gray-500">
            {searchQuery
              ? `Found ${events.length} event${events.length === 1 ? "" : "s"}`
              : `Showing all ${events.length} events`}
          </p>
        </div>

        {!hasEvents ? (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-14 text-center">
            <h3 className="text-lg font-semibold text-gray-700">No results found</h3>
            <p className="mt-1 text-sm text-gray-500">Try a different search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event.id}
                onClick={() => handleCardClick(event.id)}
                className={`cursor-pointer rounded-xl border p-6 transition ${
                  lastClickedId === event.id
                    ? "border-blue-500 bg-blue-50 shadow"
                    : "border-gray-100 bg-white hover:border-blue-200 hover:shadow"
                }`}
              >
                <div className="mb-2 flex items-center justify-between">
                  <h3
                    className={`text-lg font-semibold ${
                      lastClickedId === event.id ? "text-blue-700" : "text-gray-800"
                    }`}
                  >
                    {event.name}
                  </h3>
                  {lastClickedId === event.id && (
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-600">
                      Active
                    </span>
                  )}
                </div>

                <div className="space-y-1 text-sm text-gray-600">
                  <p>{event.location}</p>
                  <p>{event.date}</p>
                </div>

                <div
                  className={`mt-4 inline-block rounded px-2.5 py-1 text-xs font-medium ${
                    lastClickedId === event.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {event.category}
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
};

export default EventGrid;
