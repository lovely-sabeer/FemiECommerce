import React from 'react'
import Navbar from '../components/Navbar'
import ProductPurchase from '../components/ProductPurchase'

function Purchase() {
	return (
		<div className='flex flex-col '>
			<Navbar />
			<ProductPurchase/>
		</div>
	)
}

export default Purchase