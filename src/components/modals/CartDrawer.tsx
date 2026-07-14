import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, CreditCard, ShoppingBag, Truck, Gift, CheckCircle } from 'lucide-react';
import { Succulent } from '../../data';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';

export default function CartDrawer() {
  const { cart: cartItems, updateQuantity, removeItem, clearCart } = useCart();
  const { isCartOpen: isOpen, setIsCartOpen } = useUI();
  
  const onClose = () => setIsCartOpen(false);
  const onUpdateQuantity = updateQuantity;
  const onRemoveItem = removeItem;
  const onClearCart = clearCart;
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'form' | 'success'>('cart');
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    zip: '',
    city: '',
    phone: '',
  });

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.plant.price * item.quantity, 0);
  const isFreeShipping = subtotal >= 50;
  const shippingFee = subtotal === 0 ? 0 : isFreeShipping ? 0 : 5.90;
  const total = subtotal + shippingFee;

  const freeShippingProgress = Math.min((subtotal / 50) * 100, 100);
  const remainingForFreeShipping = 50 - subtotal;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('success');
  };

  const handleCompleteOrder = () => {
    onClearCart();
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-primary/80 backdrop-blur-sm animate-fade-in">
      {/* Click outside to close */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />

      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between p-4 sm:p-6 relative border-l border-primary/10 animate-slide-left">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-primary/10 mb-4">
          <div className="flex items-center space-x-2 text-left min-w-0 pr-2">
            <ShoppingBag className="w-5 h-5 text-accent flex-shrink-0" />
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-primary uppercase truncate">
              {checkoutStep === 'cart' && 'Mon Panier'}
              {checkoutStep === 'form' && 'Livraison'}
              {checkoutStep === 'success' && 'Commande Confirmée'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 min-w-[44px] min-h-[44px] bg-secondary hover:bg-primary hover:text-white rounded-full transition-all cursor-pointer text-primary"
            aria-label="Fermer le panier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Content Panels */}
        <div className="flex-grow overflow-y-auto pr-1">
          
          {checkoutStep === 'cart' && (
            <>
              {/* Free Shipping Alert Banner */}
              {cartItems.length > 0 && (
                <div className="bg-secondary/50 rounded-2xl p-4 mb-6 border border-primary/5 text-left">
                  <div className="flex items-center justify-between text-xs font-bold text-primary mb-2">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-accent" />
                      {isFreeShipping ? 'Livraison offerte !' : 'Livraison gratuite dès 50 €'}
                    </span>
                    {!isFreeShipping && (
                      <span className="text-accent">{remainingForFreeShipping.toFixed(2)} € restants</span>
                    )}
                  </div>
                  <div className="w-full bg-primary/10 rounded-full h-1.5">
                    <div
                      className="bg-accent h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${freeShippingProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Cart List */}
              {cartItems.length === 0 ? (
                <div className="py-24 text-center">
                  <ShoppingBag className="w-14 h-14 text-primary/70 mx-auto mb-4" />
                  <p className="font-display text-lg font-bold text-primary/70">Votre panier est vide</p>
                  <p className="text-xs text-primary/70 mt-1 max-w-xs mx-auto">Parcourez notre collection et ajoutez des succulentes d'exception pour commencer.</p>
                  <button aria-label="Bouton d'action"
                    onClick={onClose}
                    className="mt-6 px-6 py-2.5 bg-primary text-white font-bold text-xs uppercase tracking-wider rounded-full hover:bg-accent transition-all cursor-pointer"
                  >
                    Continuer mes achats
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.plant.id}
                      className="flex items-center space-x-4 p-3 bg-secondary/30 rounded-xl border border-primary/5 text-left relative group"
                    >
                      {/* Product Thumbnail */}
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-secondary flex-shrink-0 border border-primary/5">
                        <img
                          src={item.plant.image}
                          alt={item.plant.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Info & Quantity controls */}
                      <div className="flex-grow flex flex-col min-w-0 pr-1">
                        <h3 className="font-display font-bold text-sm text-primary uppercase leading-none truncate">
                          {item.plant.name}
                        </h3>
                        <span className="text-[10px] font-mono text-primary/70 mt-1">
                          {item.plant.scientificName}
                        </span>

                        {/* Controls */}
                        <div className="flex items-center space-x-2.5 mt-2.5">
                          <button aria-label="Bouton d'action"
                            onClick={() => onUpdateQuantity(item.plant.id, item.quantity - 1)}
                            className="p-2 min-w-[44px] min-h-[44px] rounded-full bg-white hover:bg-primary hover:text-white text-primary border border-primary/5 transition-all cursor-pointer"
                            aria-label="Diminuer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-primary w-4 text-center">
                            {item.quantity}
                          </span>
                          <button aria-label="Bouton d'action"
                            onClick={() => onUpdateQuantity(item.plant.id, item.quantity + 1)}
                            className="p-2 min-w-[44px] min-h-[44px] rounded-full bg-white hover:bg-primary hover:text-white text-primary border border-primary/5 transition-all cursor-pointer"
                            aria-label="Augmenter"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Price & Delete Row */}
                      <div className="flex flex-col items-end justify-between self-stretch py-0.5">
                        <button aria-label="Bouton d'action"
                          onClick={() => onRemoveItem(item.plant.id)}
                          className="text-primary/70 hover:text-red-500 transition-colors p-1"
                          aria-label="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <span className="font-mono font-bold text-sm text-primary whitespace-nowrap">
                          {(item.plant.price * item.quantity).toFixed(2)}&nbsp;€
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {checkoutStep === 'form' && (
            <form onSubmit={handleCheckoutSubmit} className="space-y-4 text-left p-1">
              <div className="bg-secondary/40 p-4 rounded-xl mb-4 border border-primary/5">
                <p className="text-xs text-primary/70 font-sans leading-relaxed flex items-center gap-1.5 font-medium">
                  <Gift className="w-4 h-4 text-accent" />
                  Vos succulentes seront rempotées à la commande dans notre terreau artisanal.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-primary/70 font-mono mb-1.5">Nom Complet</label>
                <input
                  type="text"
                  required
                  placeholder="Jean Dupont"
                  value={shippingInfo.name}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                  className="w-full bg-secondary/50 border border-primary/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-primary/70 font-mono mb-1.5">Adresse de livraison</label>
                <input
                  type="text"
                  required
                  placeholder="14 Rue des Echeverias"
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                  className="w-full bg-secondary/50 border border-primary/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-primary/70 font-mono mb-1.5">Code Postal</label>
                  <input
                    type="text"
                    required
                    placeholder="75011"
                    value={shippingInfo.zip}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                    className="w-full bg-secondary/50 border border-primary/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-primary/70 font-mono mb-1.5">Ville</label>
                  <input
                    type="text"
                    required
                    placeholder="Paris"
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                    className="w-full bg-secondary/50 border border-primary/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-primary/70 font-mono mb-1.5">Téléphone mobile</label>
                <input
                  type="tel"
                  required
                  placeholder="06 12 34 56 78"
                  value={shippingInfo.phone}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                  className="w-full bg-secondary/50 border border-primary/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
              
              <button aria-label="Bouton d'action"
                type="submit"
                className="hidden"
                id="hidden-submit-form"
              />
            </form>
          )}

          {checkoutStep === 'success' && (
            <div className="text-center py-8 px-2 animate-scale-up">
              <CheckCircle className="w-16 h-16 text-accent mx-auto mb-5 animate-pulse" />
              <h2 className="font-display font-extrabold text-2xl text-primary uppercase">
                Merci pour votre commande !
              </h2>
              <p className="text-xs text-primary/70 mt-1 font-mono">ID de Commande: #GRW-{Math.floor(100000 + Math.random() * 900000)}</p>

              <div className="bg-secondary/40 rounded-2xl p-5 my-6 text-left border border-primary/5 text-xs text-primary/80 leading-relaxed font-sans space-y-3">
                <p>
                  🌟 Nous préparons votre colis avec soin. Les succulentes sélectionnées pour <strong>{shippingInfo.name}</strong> seront dépotées, inspectées et expédiées sous 24h.
                </p>
                <p className="border-t border-primary/5 pt-3">
                  📍 <strong>Adresse de livraison :</strong><br />
                  {shippingInfo.address}, {shippingInfo.zip} {shippingInfo.city}
                </p>
                <p className="border-t border-primary/5 pt-3">
                  📦 <strong>Date de livraison estimée :</strong><br />
                  Dans 3 jours ouvrés. Un lien de suivi Colissimo vous sera envoyé sur votre téléphone ({shippingInfo.phone}).
                </p>
              </div>

              <div className="bg-accent/5 rounded-xl p-3.5 text-left border border-accent/10">
                <p className="text-[11px] text-accent font-medium font-sans">
                  💡 <strong>Conseil Réception :</strong> À l'arrivée, déballez immédiatement vos plantes grasses et placez-les sous une lumière vive indirecte pendant 24h avant de leur donner un léger arrosage.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer Summary & Action triggers */}
        {checkoutStep !== 'success' && cartItems.length > 0 && (
          <div className="border-t border-primary/10 pt-4 mt-4 bg-white">
            
            {/* Invoice Lines */}
            <div className="space-y-2 text-sm text-left mb-5">
              <div className="flex items-center justify-between text-primary/70 font-sans">
                <span>Sous-total</span>
                <span className="font-mono font-medium whitespace-nowrap">{subtotal.toFixed(2)}&nbsp;€</span>
              </div>
              <div className="flex items-center justify-between text-primary/70 font-sans">
                <span>Frais de port</span>
                <span className="font-mono font-medium whitespace-nowrap">{shippingFee === 0 ? 'Offerts' : `${shippingFee.toFixed(2)}\u00A0€`}</span>
              </div>
              <div className="flex items-center justify-between text-primary font-display font-bold text-base border-t border-primary/5 pt-2.5">
                <span>TOTAL</span>
                <span className="font-mono font-bold text-lg text-accent whitespace-nowrap">{total.toFixed(2)}&nbsp;€</span>
              </div>
            </div>

            {/* Main Action Trigger */}
            {checkoutStep === 'cart' ? (
              <button aria-label="Bouton d'action"
                onClick={() => setCheckoutStep('form')}
                className="w-full py-4.5 bg-primary hover:bg-accent text-white font-sans font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
              >
                <CreditCard className="w-4 h-4 text-gold" />
                <span>Passer la commande</span>
              </button>
            ) : (
              <div className="flex gap-3">
                <button aria-label="Bouton d'action"
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="w-1/3 py-4 bg-secondary hover:bg-primary/5 text-primary font-sans font-bold text-xs uppercase tracking-wider rounded-full transition-all border border-primary/10 cursor-pointer"
                >
                  Retour
                </button>
                <button aria-label="Bouton d'action"
                  type="button"
                  onClick={() => {
                    const btn = document.getElementById('hidden-submit-form');
                    if (btn) btn.click();
                  }}
                  className="w-2/3 py-4 bg-accent hover:bg-primary text-white font-sans font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4 text-gold" />
                  <span>Confirmer & Payer</span>
                </button>
              </div>
            )}

          </div>
        )}

        {checkoutStep === 'success' && (
          <div className="pt-4 border-t border-primary/10 mt-4">
            <button aria-label="Bouton d'action"
              onClick={handleCompleteOrder}
              className="w-full py-4.5 bg-primary hover:bg-accent text-white font-sans font-bold text-xs uppercase tracking-widest rounded-full transition-all shadow-lg cursor-pointer"
            >
              Retour à l'accueil
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
