"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { qoplaOrderUrl, sitePhoneHref, siteFullAddress } from "@/config/site";
import { 
  showOrderSuccessToast, 
  showWhatsAppToast, 
  showDirectionsToast,
  showChatToast,
  showReservationToast 
} from "@/lib/toast";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { Button } from "@/components/ui/button";
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  ShoppingBag, 
  ShoppingCart, 
  Heart,
  Home,
  Images,
  Store
} from "lucide-react";

interface FABAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  action: string;
  href?: string;
  showOnPages?: string[]; // If undefined, show on all pages
}

export default function FloatingActionButtons() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [bottomSheetContent, setBottomSheetContent] = useState<string>("");
  const [showChat, setShowChat] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useLanguage();

  // Define all possible FAB actions for clothing e-commerce
  const allActions: FABAction[] = [
    {
      id: "shop",
      label: t.fab.orderNow,
      icon: <ShoppingBag className="h-5 w-5" />,
      color: "bg-blue-600 hover:bg-blue-700",
      action: "shop"
    },
    {
      id: "contact",
      label: t.fab.callUs,
      icon: <Phone className="h-5 w-5" />,
      color: "bg-emerald-600 hover:bg-emerald-700",
      action: "contact"
    },
    {
      id: "lookbook",
      label: t.fab.reserveTable,
      icon: <Images className="h-5 w-5" />,
      color: "bg-purple-600 hover:bg-purple-700",
      action: "lookbook"
    },
    {
      id: "products",
      label: t.fab.viewMenu,
      icon: <Store className="h-5 w-5" />,
      color: "bg-indigo-600 hover:bg-indigo-700",
      action: "products"
    },
    {
      id: "home",
      label: "Home",
      icon: <Home className="h-5 w-5" />,
      color: "bg-orange-600 hover:bg-orange-700",
      action: "home"
    },
    {
      id: "wishlist",
      label: "Wishlist",
      icon: <Heart className="h-5 w-5" />,
      color: "bg-pink-600 hover:bg-pink-700",
      action: "wishlist"
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      icon: <MessageCircle className="h-5 w-5" />,
      color: "bg-green-600 hover:bg-green-700",
      action: "whatsapp",
      showOnPages: ["/contact", "/jackets"]
    }
  ];

  // Filter actions based on current page
  const contextualActions = allActions.filter(action => {
    if (!action.showOnPages) return true;
    return action.showOnPages.some(page => pathname.startsWith(page));
  });

  const handleAction = (action: string, href?: string) => {
    switch (action) {
      case "shop":
        router.push("/jackets");
        break;
      case "lookbook":
        router.push("/gallery");
        break;
      case "products":
        router.push("/menu");
        break;
      case "contact":
        router.push("/contact");
        break;
      case "home":
        router.push("/");
        break;
      case "wishlist":
        router.push("/gallery");
        break;
      case "whatsapp":
        // WhatsApp business link for clothing inquiries
        window.open(`https://wa.me/${sitePhoneHref}?text=Hi! I'd like to know more about your clothing collection`, "_blank");
        showWhatsAppToast();
        break;
      case "chat":
        setShowChat(!showChat);
        showChatToast();
        break;
    }
    setIsExpanded(false);
  };

  // Close expanded menu when clicking outside
  useEffect(() => {
    if (isExpanded) {
      const handleClickOutside = () => setIsExpanded(false);
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isExpanded]);

  return (
    <>
      {/* Desktop FAB - Speed Dial */}
      <div className="hidden md:block fixed bottom-8 right-8 z-40">
        <div className="relative">
          {/* Secondary FABs - Speed Dial Menu */}
          <AnimatePresence>
            {isExpanded && contextualActions.slice(1).map((item, index) => (
              <motion.div
                key={item.id}
                className="absolute bottom-0 right-0 mb-6"
                initial={{ opacity: 0, y: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  y: -(index + 1) * 75,
                  scale: 1,
                }}
                exit={{ opacity: 0, y: 0, scale: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                  delay: index * 0.04
                }}
              >
                <motion.button
                  className={`${item.color} text-white w-14 h-14 rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center justify-center relative group`}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAction(item.action, item.href);
                  }}
                >
                  {item.icon}
                  
                  {/* Tooltip */}
                  <motion.div
                    className="absolute right-20 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg backdrop-blur-sm border border-white/10"
                    initial={{ opacity: 0, x: 10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                  >
                    {item.label}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-2 h-2 bg-gray-900 rotate-45" />
                  </motion.div>

                  {/* Ring effect on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-white/30"
                    initial={{ scale: 1, opacity: 0 }}
                    whileHover={{ scale: 1.3, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Main FAB - Speed Dial Trigger */}
          <div className="relative">
            <motion.button
              className="bg-gradient-to-br from-primary via-orange-500 to-red-500 text-white w-20 h-20 rounded-full shadow-2xl hover:shadow-[0_20px_80px_rgba(255,107,53,0.6)] transition-all flex items-center justify-center relative overflow-visible ring-4 ring-primary/20 hover:ring-primary/40"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 15px 50px rgba(255,107,53,0.4)",
                  "0 20px 70px rgba(255,107,53,0.6)",
                  "0 15px 50px rgba(255,107,53,0.4)",
                ]
              }}
              transition={{
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
            >
              {/* Plus/X Icon with rotation */}
              <motion.div
                className="text-white text-5xl font-light leading-none"
                animate={{
                  rotate: isExpanded ? 45 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                +
              </motion.div>

              {/* Ripple Effect */}
              <motion.div
                className="absolute inset-0 bg-white rounded-full -z-10"
                initial={{ scale: 0, opacity: 0.5 }}
                animate={{
                  scale: [0, 2.5],
                  opacity: [0.5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            </motion.button>

            {/* Pulse badge - "Quick Actions" */}
            <AnimatePresence>
              {!isExpanded && (
                <motion.div
                  className="absolute -top-2 -right-2 bg-gradient-to-r from-red-600 to-red-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-2xl border-[3px] border-white z-50 pointer-events-none"
                  initial={{ scale: 0, rotate: -15 }}
                  animate={{ 
                    scale: [1, 1.15, 1],
                    rotate: [-5, 5, -5]
                  }}
                  exit={{ scale: 0 }}
                  transition={{ 
                    scale: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    },
                    rotate: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  {t.fab.quickLabel}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Live Chat Bubble - Desktop */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            className="hidden md:block fixed bottom-32 right-8 z-40 w-80 bg-background border border-border rounded-2xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="bg-gradient-to-r from-primary to-orange-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <div>
                    <h4 className="font-bold">Chat with us</h4>
                    <p className="text-xs opacity-90">We're here to help!</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowChat(false)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start gap-3"
                onClick={() => handleAction("whatsapp")}
              >
                <MessageCircle className="h-4 w-4" />
                Message on WhatsApp
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-3"
                onClick={() => handleAction("contact")}
              >
                <Phone className="h-4 w-4" />
                Contact Us
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-3"
                onClick={() => router.push("/gallery")}
              >
                <Images className="h-4 w-4" />
                View Lookbook
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation - Enhanced */}
      <motion.div
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/98 border-t border-border shadow-[0_-8px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-1 p-2 min-w-max">
            {contextualActions.slice(0, 6).map((item, index) => (
              <motion.button
                key={item.id}
                className="flex flex-col items-center justify-center py-3 px-3 rounded-xl hover:bg-muted/50 transition-all relative group min-w-[72px]"
                whileTap={{ scale: 0.9 }}
                onClick={() => handleAction(item.action, item.href)}
              >
                <motion.div
                  className={`p-2.5 rounded-2xl ${item.color.split(" ")[0]} text-white mb-1.5 shadow-lg`}
                  animate={index === 0 ? {
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, -5, 0]
                  } : {}}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2
                  }}
                >
                  {item.icon}
                </motion.div>
                <span className="text-[10px] font-semibold text-foreground leading-tight text-center">
                  {item.label.split(" ").slice(0, 2).join(" ")}
                </span>

                {/* Badge for primary action */}
                {index === 0 && (
                  <motion.div
                    className="absolute -top-1 -right-1 bg-gradient-to-r from-red-600 to-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-black shadow-lg border border-white"
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ 
                      delay: 0.3,
                      scale: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }}
                  >
                    NEW
                  </motion.div>
                )}

                {/* Active indicator */}
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 bg-primary rounded-full opacity-0 group-active:opacity-100 transition-opacity"
                  style={{ width: "50%" }}
                />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Chat button in mobile */}
        <div className="absolute -top-16 right-4">
          <motion.button
            className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full shadow-xl flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleAction("chat")}
            animate={{
              boxShadow: [
                "0 10px 40px rgba(59, 130, 246, 0.4)",
                "0 15px 60px rgba(59, 130, 246, 0.6)",
                "0 10px 40px rgba(59, 130, 246, 0.4)",
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <MessageCircle className="h-6 w-6" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
          </motion.button>
        </div>
      </motion.div>

      {/* Bottom Sheet Modals */}
      <BottomSheet
        isOpen={showBottomSheet}
        onClose={() => setShowBottomSheet(false)}
        title="Quick Actions"
        height="md"
      >
        <div className="p-6 space-y-4">
          <p className="text-muted-foreground mb-6">
            How can we help you today?
          </p>
          
          <Button
            variant="default"
            size="lg"
            className="w-full justify-start gap-3"
            onClick={() => {
              router.push("/jackets");
              setShowBottomSheet(false);
            }}
          >
            <ShoppingBag className="h-5 w-5" />
            <div className="text-left">
              <div className="font-bold">Shop Collection</div>
              <div className="text-xs opacity-80">Browse our jackets</div>
            </div>
          </Button>

          <Button
            variant="secondary"
            size="lg"
            className="w-full justify-start gap-3"
            onClick={() => {
              handleAction("whatsapp");
              setShowBottomSheet(false);
            }}
          >
            <MessageCircle className="h-5 w-5" />
            <div className="text-left">
              <div className="font-bold">WhatsApp Us</div>
              <div className="text-xs opacity-80">Message us directly</div>
            </div>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full justify-start gap-3"
            onClick={() => {
              router.push("/contact");
              setShowBottomSheet(false);
            }}
          >
            <Phone className="h-5 w-5" />
            <div className="text-left">
              <div className="font-bold">Contact Form</div>
              <div className="text-xs opacity-80">Send us a message</div>
            </div>
          </Button>
        </div>
      </BottomSheet>
    </>
  );
}
