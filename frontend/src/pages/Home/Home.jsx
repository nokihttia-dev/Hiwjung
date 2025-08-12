import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import CategoryMenu from '../../components/CategoryMenu/CategoryMenu'
import FeatureRecipe from '../../components/FeatureRecipe/FeatureRecipe'


const Home = () => {
  return (
    <div>
      <Header/>
      <CategoryMenu/>
      <FeatureRecipe/>
      
    </div>
  )
}

export default Home
