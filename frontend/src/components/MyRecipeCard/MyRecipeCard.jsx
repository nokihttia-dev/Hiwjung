import React, { useState } from 'react';
import './MyRecipeCard.css';

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

export default MyRecipeCard;
