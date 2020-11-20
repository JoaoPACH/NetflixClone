const API_KEY = 'ecf560c470b7f4897fd4efe9a45b2f66';
const API_BASE = 'https://api.themoviedb.org/3';

/**
 * Originais da netflix;
 * Recomendados (trending);
 * Em alta "Mais votados" (Top rated);
 * Lista de filmes de ação;
 * Lista de filmes de comédia;
 * Lista de filmes de terror;
 * Lista de filmes de romance;
 * Lista de filmes de documentários;
*/

const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`); //requisição para o serviço externo, e vai esperar a resposta para passar para próxima linha de comando
    const json = await req.json();
    return json;
}

export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Originais do Netflix',
                items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`) //pega os seriados originais da netflix
            },
            {
                slug: 'trending',
                title: 'Recomendados para Você',
                items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`) //pega os seriados em destaque na semana
            },
            {
                slug: 'toprated',
                title: 'Em Alta',
                items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`) //pega os seriados que estão em alta
            },
            {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`) //pega os seriados de ação
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`) //pega os seriados de comédia
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`) //pega os seriados de terror
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`) //pega os seriados de romance
            },
            {
                slug: 'documentary',
                title: 'Documentários',
                items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`) //pega os seriados de documentários
            },
        ];
    },

    getMovieInfo: async (movieId, type) => {
        let info = {};

        if (movieId) {
            switch (type) {
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                    break;
                    
                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                    break;

                default:
                    info = null;
                    break;
            }
        }

        return info;
    }

}