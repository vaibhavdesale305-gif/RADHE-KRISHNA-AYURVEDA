
import React, { useState } from 'react';
import { Product, Order, Category } from '../types';
import { LayoutDashboard, ShoppingBag, List, Users, AlertCircle, Plus, Edit, Trash2, X, Save, Image as ImageIcon } from 'lucide-react';
import { CATEGORIES } from '../constants';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  onSave: (p: Product) => void;
  onDelete: (id: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ products, orders, onSave, onDelete }) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const lowStockProducts = products.filter(p => p.stockStatus === 'Low Stock');

  const handleEdit = (product: Product) => {
    setEditingProduct({ ...product });
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProduct({
      id: 'p' + Date.now(),
      name: '',
      category: 'Hair Care',
      description: '',
      ayurvedicBenefits: [],
      ingredients: [],
      usage: '',
      price: 0,
      mrp: 0,
      discount: 0,
      images: ['https://picsum.photos/seed/new/600/600'],
      stockStatus: 'In Stock',
      rating: 5,
      reviewsCount: 0,
      isEnabled: true,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      onSave(editingProduct);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 brand-font flex items-center gap-3">
          <LayoutDashboard className="w-6 h-6 text-emerald-600" /> Admin Control
        </h1>
        <button 
          onClick={handleAddNew}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 shadow-lg active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" /> ADD PRODUCT
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-xs font-bold uppercase">Total Orders</p>
          <p className="text-2xl font-bold mt-1">{orders.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-xs font-bold uppercase">Revenue</p>
          <p className="text-2xl font-bold mt-1">₹{orders.reduce((s,o) => s+o.totalAmount, 0)}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-xs font-bold uppercase">Products</p>
          <p className="text-2xl font-bold mt-1">{products.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border-red-100 bg-red-50/30">
          <p className="text-red-500 text-xs font-bold uppercase flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> Low Stock
          </p>
          <p className="text-2xl font-bold mt-1 text-red-600">{lowStockProducts.length}</p>
        </div>
      </div>

      {/* Modal for Add/Edit */}
      {isModalOpen && editingProduct && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10">
              <h2 className="text-xl font-bold text-gray-900 brand-font">
                {editingProduct.id.startsWith('p1') || editingProduct.id.startsWith('p2') ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Product Name</label>
                  <input 
                    required
                    value={editingProduct.name}
                    onChange={e => setEditingProduct({...editingProduct, name: e.target.value})}
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Category</label>
                  <select 
                    value={editingProduct.category}
                    onChange={e => setEditingProduct({...editingProduct, category: e.target.value as Category})}
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    {CATEGORIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Price (₹)</label>
                  <input 
                    type="number"
                    required
                    value={editingProduct.price}
                    onChange={e => setEditingProduct({...editingProduct, price: parseInt(e.target.value)})}
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">MRP (₹)</label>
                  <input 
                    type="number"
                    required
                    value={editingProduct.mrp}
                    onChange={e => setEditingProduct({...editingProduct, mrp: parseInt(e.target.value)})}
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
                <textarea 
                  required
                  value={editingProduct.description}
                  onChange={e => setEditingProduct({...editingProduct, description: e.target.value})}
                  className="w-full border rounded-lg p-2 h-24 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" /> Image URL
                </label>
                <input 
                  required
                  value={editingProduct.images[0]}
                  onChange={e => setEditingProduct({...editingProduct, images: [e.target.value]})}
                  placeholder="Paste image link here..."
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="submit" 
                  className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-emerald-700 transition-all"
                >
                  <Save className="w-5 h-5" /> SAVE CHANGES
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Table View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <List className="w-5 h-5 text-emerald-600" /> Manage Products
            </h3>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-4">Product</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={p.images[0]} className="w-10 h-10 rounded object-cover border" alt="" />
                          <div>
                            <p className="font-bold text-gray-900 line-clamp-1">{p.name}</p>
                            <p className="text-[10px] text-gray-400">{p.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-semibold">₹{p.price}</td>
                      <td className="p-4">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          p.stockStatus === 'In Stock' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                        }`}>
                          {p.stockStatus}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit(p)} className="p-1.5 hover:bg-emerald-50 text-emerald-600 rounded">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => onDelete(p.id)} className="p-1.5 hover:bg-red-50 text-red-500 rounded">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Orders Overview */}
        <div className="space-y-4">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-600" /> Recent Orders
          </h3>
          <div className="space-y-3">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center group cursor-pointer hover:border-emerald-200">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">{order.shippingAddress.name}</p>
                    <p className="text-[10px] text-gray-400">#{order.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">₹{order.totalAmount}</p>
                  <p className="text-[10px] text-emerald-600 font-bold uppercase">{order.status}</p>
                </div>
              </div>
            ))}
            {orders.length === 0 && (
              <div className="text-center py-10 text-gray-400">
                <ShoppingBag className="w-10 h-10 mx-auto opacity-20 mb-2" />
                <p className="text-xs font-bold">No orders yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
