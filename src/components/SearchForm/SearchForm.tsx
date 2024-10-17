import { useQuery } from '@tanstack/react-query';
import './SearchForm.css';
import { fetchFiltered } from '../../api/fetchFiltered';
import { queryClient } from '../../api/queryClient';
import { Loader } from '../Loader';
import { MovieHeader, MoviePoster } from '../../pages/Movie';
import { Link, useParams } from 'react-router-dom';
import { IMovie } from '../../pages/Movie/iMovie';

export const SearchForm = () => {
    const { search } = useParams();

    const searchQuery = useQuery({
        queryFn: () => fetchFiltered({ count: 5, title: search }),
        queryKey: ["search", search]
    }, queryClient);

    switch (searchQuery.status) {
        case "pending": return <Loader />;
        case "error": return <div>=ERROR SEARCH=</div>;
        case "success": {
            return (
                <div className='search-list'> {
                    searchQuery.data.map((movie: IMovie, ind: number) =>
                        <Link className="search-item" to={`/movie/${movie.id}`} key={ind} state={{ data: movie }}>
                            <MoviePoster data={movie} isModal={true} />
                            <div>
                                <MovieHeader data={movie} isModal={true} />
                                <p className="search-title">{movie.title}</p>
                            </div>
                        </Link>
                    )
                }</div>
            )
        }
    }
}