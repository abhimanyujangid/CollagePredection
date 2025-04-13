import { Category } from '@/page/Home/Home';
import { useNavigate } from 'react-router-dom';

interface Iprops{
    categories: Category[];
    setActiveCategory: Function;
    activeCategory: number;
}

const DashboardSidebar = ({categories, setActiveCategory, activeCategory}:Iprops) => {
    const navigate = useNavigate();


    const handleCategoryClick = (category: Category) => {
        setActiveCategory(category?.id);
        navigate(category?.path);
    };


    return (
        <div className='border-r shadow-mdrounded-lg p-4 h-full w-1/5 '>
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">College Categories</h2>
                <p className="text-sm text-muted-foreground">Browse by stream</p>
            </div>
            <nav>
                <ul className="space-y-2">
                    {categories.map((category) => (
                        <li key={category.name} onClick={() => handleCategoryClick(category)}>
                            <a
                                href="#"
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-muted transition-colors duration-200 ${category.id === activeCategory ? 'bg-muted' : ''}`}
                            >
                                {category.icon}
                                <span>{category.name}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default DashboardSidebar;
