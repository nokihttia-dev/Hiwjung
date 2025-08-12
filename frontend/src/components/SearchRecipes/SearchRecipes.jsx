import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchRecipes.css';

const MyRecipeCard = ({ _id, recipeName, description, cookTime, prepTime, servings, difficulty, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    recipeName,
    description,
    cookTime,
    prepTime,
    servings,
    difficulty,
  });

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({ recipeName, description, cookTime, prepTime, servings, difficulty });
  };
  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:5000/recipe/${_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });
      if (res.ok) {
        alert('Recipe updated successfully');
        const updatedRecipe = await res.json();
        setIsEditing(false);
        if (typeof onUpdate === 'function') onUpdate(_id, updatedRecipe.recipe);
      } else {
        alert('Failed to update recipe');
      }
    } catch (err) {
      alert('Error updating recipe: ' + err.message);
    }
  };
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;
    try {
      const res = await fetch(`http://localhost:5000/recipes/${_id}`, { method: 'DELETE' });
      if (res.ok) {
        if (onDelete) onDelete(_id); // แจ้ง parent ให้ลบออกจาก state
      } else {
        alert('Failed to delete recipe');
      }
    } catch {
      alert('Error deleting recipe');
    }
  };

  return (
    <div className="myrecipe-card">
      <div className="myrecipe-card-content">
        {isEditing ? (
          <>
            <input
              name="recipeName"
              value={editData.recipeName}
              onChange={handleChange}
              placeholder="Recipe Name"
              style={{ marginTop: '10px', width: '100%', height: '40px' }}
            />
            <textarea
              name="description"
              value={editData.description}
              onChange={handleChange}
              placeholder="Description"
              style={{ marginTop: '10px', width: '100%', height: '40px' }}
            />
            <div className="myrecipe-card-details">
              <span>
                Prep Time:{' '}
                <input
                  name="prepTime"
                  type="number"
                  value={editData.prepTime}
                  onChange={handleChange}
                  style={{ width: '60%' }}
                />{' '}
                mins
              </span>
              <span>
                Cook Time:{' '}
                <input
                  name="cookTime"
                  type="number"
                  value={editData.cookTime}
                  onChange={handleChange}
                  style={{ width: '60%' }}
                />{' '}
                mins
              </span>
              <span>
                Servings:{' '}
                <input
                  name="servings"
                  type="number"
                  value={editData.servings}
                  onChange={handleChange}
                  style={{ width: '60%' }}
                />
              </span>
              <span>
                Difficulty:{' '}
                <select
                  name="difficulty"
                  value={editData.difficulty}
                  onChange={handleChange}
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </span>
            </div>
            <div className="myrecipe-card-actions">
              <button className="btn-edit" onClick={handleSave}>Save</button>
              <button className="btn-delete" onClick={handleCancel}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <h3>{recipeName}</h3>
            <p>{description}</p>
            <div className="myrecipe-card-details">
              <span>Prep Time: {prepTime} mins</span>
              <span>Cook Time: {cookTime} mins</span>
              <span>Servings: {servings}</span>
              <span>Difficulty: {difficulty}</span>
            </div>
            <div className="myrecipe-card-actions">
              <button className="btn-edit" onClick={handleEdit}>Edit</button>
              <button className="btn-delete" onClick={handleDelete}>Delete</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const SearchRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  // ดึง query string จาก URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query') || '';
    setSearchTerm(query);

    const fetchRecipes = async () => {
      setLoading(true);
      try {
        // ดึงสูตรอาหารทั้งหมด
        const res = await fetch('http://localhost:5000/myRecipes');
        const data = await res.json();
        // กรองสูตรอาหารที่ชื่อหรือคำอธิบายตรงกับคำค้นหา (ไม่สนตัวพิมพ์เล็ก/ใหญ่)
        const filtered = data.filter(
          recipe =>
            recipe.recipeName.toLowerCase().includes(query.toLowerCase()) ||
            (recipe.description && recipe.description.toLowerCase().includes(query.toLowerCase()))
        );
        setRecipes(filtered);
      } catch (err) {
        setRecipes([]);
      }
      setLoading(false);
    };

    if (query) fetchRecipes();
    else {
      setRecipes([]);
      setLoading(false);
    }
  }, [location.search]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Search Results for "{searchTerm}"</h2>
      {loading ? (
        <p>Loading...</p>
      ) : recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {recipes.map(recipe => (
            <div key={recipe._id} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, width: 300 }}>
              <h3>{recipe.recipeName}</h3>
              <p>{recipe.description}</p>
              <div>
                <span>Prep: {recipe.prepTime} mins</span> |{' '}
                <span>Cook: {recipe.cookTime} mins</span> |{' '}
                <span>Servings: {recipe.servings}</span>
              </div>
              <div>
                <span>Difficulty: {recipe.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRecipeCard;
export { SearchRecipes };
