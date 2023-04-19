export const Movies = {
    method: "GET",
    url: "https://netflix-data.p.rapidapi.com/search/",
    params: {
      query: "j",
      offset: "0",
      limit_titles: "30",
      limit_suggestions: "20",
    },
    headers: {
      'X-RapidAPI-Key': 'd80f1e69e7msh1874d1a85b33279p1787b2jsncc633a0cfc42',
      'X-RapidAPI-Host': 'netflix-data.p.rapidapi.com'
    },
  };