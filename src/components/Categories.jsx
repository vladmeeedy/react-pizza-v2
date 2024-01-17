import React from 'react';

const Categories = () => {
  const [activeIndex, SetActiveIndex] = React.useState(0);

  const categories = ["Всі", "М'ясна", "Вегетаріанська", "Гриль", "Гостра", "Закрита"]

  const setCategories = (index) => {
    SetActiveIndex(index)
  }
    return (
        <div className="categories">
        <ul>
          {categories.map((value, i) => (
            <li key={i} onClick={()=>setCategories(i)} className={activeIndex === i ? "active" : ""}>{value}</li>
          ))}
          
        </ul>
      </div>
    );
};

export default Categories;