
(function() {
  
  const originalError = console.error;

  console.error = function(...args) {
    
    originalError.apply(console, args);

    const error = args[0];
    let errorMessage = "An error occurred";
    if (typeof error === 'string') {
      errorMessage = error;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    fetchSolution(errorMessage);
  };

 
  async function fetchSolution(message) {
    
    const query = encodeURIComponent(message.split('\n')[0]);
    
    const apiUrl = `https://api.stackexchange.com/2.3/search/excerpts?order=desc&sort=relevance&q=${query}&site=stackoverflow`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) return;

      const data = await response.json();

      if (data.items && data.items.length > 0) {
        const topResult = data.items[0];

        const decodedTitle = decodeHTMLEntities(topResult.title);
        const cleanedExcerpt = decodeHTMLEntities(stripHTML(topResult.body));

        console.groupCollapsed(
          ` %cConsole Genius %c(Click to see solution) %c» ${decodedTitle}`,
          "color: #fff; background-color: #7C4DFF; padding: 2px 5px; border-radius: 3px; font-weight: bold; font-size: 11px;",
          "color: #9E9E9E; font-style: italic; font-weight: normal; font-size: 11px;",
          "color: #00C853; font-weight: bold; font-size: 11px;"
        );
        
        console.log(`%cSolution Gist:`, "font-weight: bold; color: #00C853;");
        console.log(cleanedExcerpt || "[No answer text available, see link.]");
        console.log(`%cSource:`, "font-weight: bold; margin-top: 8px;");
        console.log(`https://stackoverflow.com/q/${topResult.question_id}`);
        
        console.groupEnd();
        
      } else {
        console.log(
          ` %cConsole Genius: No solutions found for this error.`,
          "color: #FFA000;"
        );
      }
    } catch (err) {
      originalError.call(console, "Console Genius fetch failed:", err);
    }
  }

  
  function stripHTML(html) {
    if (!html) return ""; 
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  }
  
  
  function decodeHTMLEntities(text) {
    if (!text) return ""; 
    const ta = document.createElement("textarea");
    ta.innerHTML = text;
    return ta.value;
  }

})();