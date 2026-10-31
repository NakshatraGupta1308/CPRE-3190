/*
  Author: Nakshatra Gupta
  Email : ng1308@iastate.edu
  Date  : October 29, 2026
*/
import { useState } from "react";

const Products = ({ products }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="flex-1 p-8 bg-[#f8f8f8]">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Products ({products.length})
        </h2>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition"
          >
            {/* Image with hover overlay */}
            <div className="relative h-120 overflow-hidden group">
              <img
                src={product.image}
                alt="product"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <button
                  className="bg-white px-4 py-2 rounded text-sm font-medium"
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowModal(true);
                  }}
                >
                  View
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="text-sm font-semibold">{product.title}</h3>
              <p className="text-green-600 font-bold">${product.price}</p>
              <span className="inline-block mt-2 px-2 py-1 text-xs rounded-full bg-amber-500 text-black">
                {product.category}
              </span>
              <div className="text-yellow-400 text-sm">
                {"★".repeat(Math.round(product.rating))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          {/* Modal Box */}
          <div className="bg-white p-6 rounded-xl w-[500px] max-h-[95vh] overflow-y-auto relative shadow-lg">
            {/* Close Button */}
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-black"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            {/* Image */}
            <div className="h-170 max-h-[55vh] overflow-hidden rounded-lg">
              <img
                src={selectedProduct.image}
                alt="product"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="mt-4">
              <h2 className="text-lg font-bold">{selectedProduct.title}</h2>
              <p className="text-sm text-gray-500 mt-2">
                {selectedProduct.description}
              </p>
              <span className="inline-block mt-2 px-2 py-1 text-xs rounded-full bg-amber-500 text-black">
                {selectedProduct.category}
              </span>

              {/* Challenge: discounted price next to the struck-out original price */}
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-gray-400 line-through">
                  ${selectedProduct.price}
                </span>
                <span className="text-green-600 font-bold">
                  ${selectedProduct.discountedPrice}
                </span>
              </div>

              {/* Challenge: stock count and available sizes */}
              <p className="text-sm text-gray-700 mt-2">
                In stock: <span className="font-semibold">{selectedProduct.stock}</span>
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-gray-700">Sizes:</span>
                {selectedProduct.size.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 text-xs border border-gray-300 rounded"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
