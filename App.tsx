import React, { useMemo, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Category = "Food" | "Drinks" | "Desserts";
type Course = "Starter" | "Main Course" | "Dessert";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  course: Course;
  image: string;
  available: boolean;
};

type Draft = {
  name: string;
  description: string;
  price: string;
  category: Category;
  course: Course;
  image: string;
};

const COLORS = {
  background: "#F7F4FB",
  surface: "#F1E8FF",
  card: "#2D1B44",
  purple: "#7B2CF5",
  purpleLight: "#AE7BFF",
  orange: "#FF8C2C",
  orangeLight: "#FFC27A",
  white: "#FFFFFF",
  muted: "#D7CBEA",
  border: "#E9DDFB",
  green: "#34C57A",
  red: "#FF6B7A",
  cream: "#FFF9F2",
  ink: "#1E1231",
  softPurple: "#EEE4FF",
};

const foodPhoto = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=85`;

const INITIAL_MENU: MenuItem[] = [
  {
    id: "1",
    name: "Classic Beef Burger",
    description:
      "Juicy flame-grilled beef patty with melted cheddar, fresh lettuce, tomato and our signature burger sauce.",
    price: 59.99,
    category: "Food",
    course: "Main Course",
    image: foodPhoto("photo-1568901346375-23c9450c58cd"),
    available: true,
  },
  {
    id: "2",
    name: "Smoky BBQ Chicken Burger",
    description:
      "Tender grilled chicken, smoky BBQ sauce, fresh lettuce and creamy cheese on a toasted bun.",
    price: 69.99,
    category: "Food",
    course: "Main Course",
    image: foodPhoto("photo-1550317138-10000687a72b"),
    available: true,
  },
  {
    id: "3",
    name: "Golden Steak and Chips",
    description:
      "Tender grilled steak served with golden crispy chips and creamy pepper sauce.",
    price: 119.99,
    category: "Food",
    course: "Main Course",
    image: foodPhoto("photo-1544025162-d76694265947"),
    available: true,
  },
  {
    id: "4",
    name: "Crispy Chicken Wings",
    description:
      "Golden chicken wings coated in our delicious sticky BBQ or peri-peri glaze.",
    price: 89.99,
    category: "Food",
    course: "Starter",
    image: foodPhoto("photo-1527477396000-e27163b481c2"),
    available: true,
  },
  {
    id: "5",
    name: "Stone-Baked Margherita Pizza",
    description:
      "A delicious crispy pizza topped with mozzarella, tomato sauce and fresh basil.",
    price: 79.99,
    category: "Food",
    course: "Main Course",
    image: foodPhoto("photo-1513104890138-7c749659a591"),
    available: true,
  },
  {
    id: "6",
    name: "Creamy Chicken Alfredo",
    description:
      "Creamy garlic pasta with grilled chicken and a generous parmesan topping.",
    price: 99.99,
    category: "Food",
    course: "Main Course",
    image: foodPhoto("photo-1473093295043-cdd812d0e601"),
    available: true,
  },
  {
    id: "7",
    name: "Fresh Garden Salad",
    description:
      "Fresh lettuce, cucumber, tomatoes, carrots and red onion with house dressing.",
    price: 49.99,
    category: "Food",
    course: "Starter",
    image: foodPhoto("photo-1512621776951-a57141f2eefd"),
    available: true,
  },
  {
    id: "7b",
    name: "Crispy Calamari Bites",
    description:
      "Golden fried calamari served with lemon aioli and a spicy dipping sauce.",
    price: 59.99,
    category: "Food",
    course: "Starter",
    image: foodPhoto("photo-1547592180-85f173990554"),
    available: true,
  },
  {
    id: "7c",
    name: "Garlic Prawn Skillet",
    description:
      "Succulent prawns tossed in garlic butter, herbs and a touch of chilli.",
    price: 64.99,
    category: "Food",
    course: "Starter",
    image: foodPhoto("photo-1559847844-5315695dadae"),
    available: true,
  },
  {
    id: "7d",
    name: "Truffle Mushroom Risotto",
    description:
      "Creamy arborio rice with mushrooms, parmesan and a rich truffle finish.",
    price: 109.99,
    category: "Food",
    course: "Main Course",
    image: foodPhoto("photo-1473093295043-cdd812d0e601"),
    available: true,
  },
  {
    id: "7e",
    name: "Herb Roast Chicken Bowl",
    description:
      "Roasted chicken breast with herb potatoes, seasonal greens and garlic dressing.",
    price: 94.99,
    category: "Food",
    course: "Main Course",
    image: foodPhoto("photo-1604908176997-125f25cc6f3d"),
    available: true,
  },
  {
    id: "8",
    name: "Southern Fried Chicken",
    description:
      "Crispy golden chicken pieces seasoned with our special house spices.",
    price: 89.99,
    category: "Food",
    course: "Main Course",
    image: foodPhoto("photo-1626082927389-6cd097cdc6ec"),
    available: true,
  },
  {
    id: "7f",
    name: "Loaded Nachos",
    description:
      "Crispy tortilla chips topped with melted cheese, jalapenos, salsa and house guacamole.",
    price: 58.99,
    category: "Food",
    course: "Starter",
    image: foodPhoto("photo-1513456852971-30c0b8199d4d"),
    available: true,
  },
  {
    id: "7g",
    name: "Buffalo Cauliflower Bites",
    description:
      "Roasted cauliflower florets tossed in a tangy buffalo glaze and served with ranch dip.",
    price: 54.99,
    category: "Food",
    course: "Starter",
    image: foodPhoto("photo-1544025162-d76694265947"),
    available: true,
  },
  {
    id: "7h",
    name: "Chocolate Lava Cake",
    description:
      "Warm chocolate cake with a molten centre and vanilla bean cream.",
    price: 52.99,
    category: "Desserts",
    course: "Dessert",
    image: foodPhoto("photo-1606313564200-e75d5e30476c"),
    available: true,
  },
  {
    id: "7i",
    name: "Berry Cheesecake Cups",
    description:
      "Creamy cheesecake layered with berry compote and crisp biscuit crumble.",
    price: 48.99,
    category: "Desserts",
    course: "Dessert",
    image: foodPhoto("photo-1551024601-bec78aea704b"),
    available: true,
  },
  {
    id: "9",
    name: "Classic Cola",
    description: "A chilled and refreshing cola served over ice.",
    price: 19.99,
    category: "Drinks",
    course: "Starter",
    image: foodPhoto("photo-1554866585-cd94860890b7"),
    available: true,
  },
  {
    id: "10",
    name: "Fresh Orange Juice",
    description:
      "Freshly squeezed orange juice with a naturally sweet citrus flavour.",
    price: 29.99,
    category: "Drinks",
    course: "Starter",
    image: foodPhoto("photo-1600271886742-f049cd451bba"),
    available: true,
  },
  {
    id: "11",
    name: "Chocolate Milkshake",
    description:
      "A thick chocolate milkshake topped with whipped cream and chocolate drizzle.",
    price: 39.99,
    category: "Drinks",
    course: "Starter",
    image: foodPhoto("photo-1572490122747-3968b75cc699"),
    available: true,
  },
  {
    id: "12",
    name: "Strawberry Smoothie",
    description:
      "A refreshing strawberry smoothie blended with creamy yoghurt.",
    price: 35.99,
    category: "Drinks",
    course: "Starter",
    image: foodPhoto("photo-1505252585461-04db1eb84625"),
    available: true,
  },
  {
    id: "13",
    name: "Belgian Chocolate Cake",
    description:
      "Moist chocolate sponge layered with rich Belgian chocolate ganache.",
    price: 49.99,
    category: "Desserts",
    course: "Dessert",
    image: foodPhoto("photo-1578985545062-69928b1d9587"),
    available: true,
  },
  {
    id: "14",
    name: "New York Cheesecake",
    description:
      "Smooth baked cheesecake on a buttery biscuit base.",
    price: 54.99,
    category: "Desserts",
    course: "Dessert",
    image: foodPhoto("photo-1533134242443-d4fd215305ad"),
    available: true,
  },
  {
    id: "15",
    name: "Golden Belgian Waffles",
    description:
      "Warm golden waffles served with fresh berries and sweet syrup.",
    price: 45.99,
    category: "Desserts",
    course: "Dessert",
    image: foodPhoto("photo-1562376552-0d160a2f238d"),
    available: true,
  },
  {
    id: "16",
    name: "Vanilla Ice Cream Delight",
    description:
      "Creamy vanilla ice cream served with chocolate sauce and sprinkles.",
    price: 34.99,
    category: "Desserts",
    course: "Dessert",
    image: foodPhoto("photo-1563805042-7684c019e1cb"),
    available: true,
  },
];

const EMPTY_DRAFT: Draft = {
  name: "",
  description: "",
  price: "",
  category: "Food",
  course: "Main Course",
  image: "",
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
  }).format(price);

const createId = () =>
  `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

// REUSABLE COMPONENTS

function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <View style={styles.sectionTitleContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {subtitle ? (
        <Text style={styles.sectionSubtitle}>{subtitle}</Text>
      ) : null}
    </View>
  );
}

function Chip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.chip, active && styles.activeChip]}
    >
      <Text style={[styles.chipText, active && styles.activeChipText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function StatCard({
  title,
  value,
  emoji,
}: {
  title: string;
  value: string;
  emoji: string;
}) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statEmoji}>{emoji}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );
}

function MenuCard({
  item,
  onEdit,
  onDelete,
  onToggle,
}: {
  item: MenuItem;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
}) {
  return (
    <View style={styles.menuCard}>
      <Image
        source={{ uri: item.image }}
        style={styles.foodImage}
        resizeMode="cover"
      />

      <View style={styles.menuCardContent}>
        <View style={styles.cardTopRow}>
          <Text style={styles.categoryLabel}>{item.category}</Text>
          <Text style={styles.price}>{formatPrice(item.price)}</Text>
        </View>

        <Text style={styles.itemName}>{item.name}</Text>

        <Text style={styles.itemDescription}>{item.description}</Text>

        <View style={styles.itemDetails}>
          <Text style={styles.courseLabel}>{item.course}</Text>
          <Text
            style={[styles.availability, !item.available && styles.unavailable]}
          >
            {item.available ? "● Available" : "● Unavailable"}
          </Text>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.editButton} onPress={onEdit}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.pauseButton} onPress={onToggle}>
            <Text style={styles.pauseText}>
              {item.available ? "Pause" : "Restore"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

type ViewMode = "Chef" | "User";

function CustomerMenuCard({
  item,
  quantity,
  onAdd,
  onDecrease,
  onRemove,
}: {
  item: MenuItem;
  quantity: number;
  onAdd: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}) {
  return (
    <View style={styles.userCard}>
      <Image source={{ uri: item.image }} style={styles.userFoodImage} resizeMode="cover" />

      <View style={styles.userCardContent}>
        <View style={styles.userMetaRow}>
          <Text style={styles.userCategory}>{item.category}</Text>
          <Text style={styles.userPrice}>{formatPrice(item.price)}</Text>
        </View>

        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userDescription}>{item.description}</Text>

        <View style={styles.userActionRow}>
          {quantity === 0 ? (
            <TouchableOpacity style={styles.addToCartButton} onPress={onAdd}>
              <Text style={styles.addToCartText}>Add to cart</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.qtyBox}>
              <TouchableOpacity style={styles.qtyButton} onPress={onDecrease}>
                <Text style={styles.qtyText}>−</Text>
              </TouchableOpacity>

              <Text style={styles.qtyValue}>{quantity}</Text>

              <TouchableOpacity style={styles.qtyButton} onPress={onAdd}>
                <Text style={styles.qtyText}>+</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.removeBtn} onPress={onRemove}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

export default function App() {
  const [menu, setMenu] = useState<MenuItem[]>(INITIAL_MENU);
  const [screen, setScreen] = useState<"Menu" | "Statistics">("Menu");
  const [viewMode, setViewMode] = useState<ViewMode>("Chef");
  const [category, setCategory] = useState<"All" | Category>("All");
  const [course, setCourse] = useState<"All" | Course>("All");
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [checkoutVisible, setCheckoutVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"Card" | "Cash" | "Wallet">("Card");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [notification, setNotification] = useState<{ text: string; tone: "success" | "info" } | null>(null);

  const triggerNotification = (text: string, tone: "success" | "info" = "success") => {
    setNotification({ text, tone });
    setTimeout(() => setNotification(null), 2800);
  };

  const totalItems = menu.length;
  const averagePrice =
    totalItems === 0
      ? 0
      : menu.reduce((total, item) => total + item.price, 0) / totalItems;

  const foodCount = menu.filter((item) => item.category === "Food").length;
  const drinksCount = menu.filter((item) => item.category === "Drinks").length;
  const dessertCount = menu.filter((item) => item.category === "Desserts").length;
  const starterCount = menu.filter((item) => item.course === "Starter").length;
  const mainCount = menu.filter((item) => item.course === "Main Course").length;
  const dessertCourseCount = menu.filter((item) => item.course === "Dessert").length;

  const cartItems = useMemo(
    () =>
      menu
        .filter((item) => cart[item.id])
        .map((item) => ({ ...item, quantity: cart[item.id] })),
    [menu, cart]
  );

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const addToCart = (item: MenuItem) => {
    setCart((previous) => ({
      ...previous,
      [item.id]: (previous[item.id] ?? 0) + 1,
    }));
  };

  const removeFromCart = (itemId: string) => {
    setCart((previous) => {
      const next = { ...previous };
      delete next[itemId];
      return next;
    });
  };

  const decreaseQuantity = (itemId: string) => {
    setCart((previous) => {
      const current = previous[itemId] ?? 0;
      if (current <= 1) {
        const next = { ...previous };
        delete next[itemId];
        return next;
      }
      return { ...previous, [itemId]: current - 1 };
    });
  };

  const checkout = () => {
    if (cartItems.length === 0) {
      Alert.alert("Your cart is empty", "Add some items before checking out.");
      return;
    }

    Alert.alert(
      "Order confirmed",
      `You have ordered ${cartItems.reduce((sum, item) => sum + item.quantity, 0)} items for ${formatPrice(cartTotal)}.`
    );
    triggerNotification(`Order placed successfully! Total: ${formatPrice(cartTotal)}`);
    setCart({});
  };

  const filteredMenu = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return menu.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchValue) ||
        item.description.toLowerCase().includes(searchValue);

      const matchesCategory = category === "All" || item.category === category;
      const matchesCourse = course === "All" || item.course === course;

      return matchesSearch && matchesCategory && matchesCourse;
    });
  }, [menu, search, category, course]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setCourse("All");
  };

  const updateDraft = (field: keyof Draft, value: string) => {
    setDraft((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const openAddForm = () => {
    setEditingId(null);
    setDraft(EMPTY_DRAFT);
    setModalVisible(true);
  };

  const openEditForm = (item: MenuItem) => {
    setEditingId(item.id);
    setDraft({
      name: item.name,
      description: item.description,
      price: String(item.price),
      category: item.category,
      course: item.course,
      image: item.image,
    });
    setModalVisible(true);
  };

  const closeForm = () => {
    setModalVisible(false);
    setEditingId(null);
    setDraft(EMPTY_DRAFT);
  };

  const saveItem = () => {
    const name = draft.name.trim();
    const description = draft.description.trim();
    const price = Number(draft.price.replace(",", "."));
    const image = draft.image.trim();

    if (!name || !description || !draft.price.trim()) {
      Alert.alert(
        "Missing information",
        "Please complete the item name, description and price."
      );
      return;
    }

    if (name.length < 3) {
      Alert.alert(
        "Invalid name",
        "The item name must have at least 3 characters."
      );
      return;
    }

    if (!Number.isFinite(price) || price <= 0) {
      Alert.alert(
        "Invalid price",
        "Please enter a valid price greater than R0.00."
      );
      return;
    }

    if (image && !/^https?:\/\/\S+/i.test(image)) {
      Alert.alert(
        "Invalid image",
        "Please enter a valid image URL beginning with http or https."
      );
      return;
    }

    const existingItem = menu.find((item) => item.id === editingId);

    const newItem: MenuItem = {
      id: editingId ?? createId(),
      name,
      description,
      price,
      category: draft.category,
      course: draft.course,
      image: image || foodPhoto("photo-1547592180-85f173990554"),
      available: existingItem?.available ?? true,
    };

    if (editingId) {
      setMenu((previous) =>
        previous.map((item) => (item.id === editingId ? newItem : item))
      );
      Alert.alert("Successfully updated", `${name} has been updated.`);
    } else {
      setMenu((previous) => [newItem, ...previous]);
      Alert.alert("Successfully added", `${name} has been added to the menu.`);
    }

    closeForm();
  };

  const deleteItem = (item: MenuItem) => {
    Alert.alert(
      "Delete menu item",
      `Are you sure you want to delete ${item.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setMenu((previous) =>
              previous.filter((menuItem) => menuItem.id !== item.id)
            );
            Alert.alert("Item deleted", `${item.name} has been removed from the menu.`);
          },
        },
      ]
    );
  };

  const toggleAvailability = (item: MenuItem) => {
    setMenu((previous) =>
      previous.map((menuItem) =>
        menuItem.id === item.id
          ? { ...menuItem, available: !menuItem.available }
          : menuItem
      )
    );
  };

  const userVisibleMenu = useMemo(
    () => filteredMenu.filter((item) => item.available),
    [filteredMenu]
  );

  const openCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert("Your cart is empty", "Add some items before checking out.");
      return;
    }

    setCheckoutVisible(true);
  };

  const completeCheckout = () => {
    if (!customerName.trim()) {
      Alert.alert("Missing customer name", "Please enter your name before placing the order.");
      return;
    }

    if (!customerPhone.trim()) {
      Alert.alert("Missing phone number", "Please enter your contact number before placing the order.");
      return;
    }

    Alert.alert(
      "Order placed successfully",
      `${customerName.trim()} your ${paymentMethod} payment of ${formatPrice(cartTotal)} has been received.`
    );

    triggerNotification(`Order confirmed: ${formatPrice(cartTotal)} via ${paymentMethod}`);

    setCustomerName("");
    setCustomerPhone("");
    setDeliveryNotes("");
    setPaymentMethod("Card");
    setCheckoutVisible(false);
    setCart({});
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoEmoji}>👨‍🍳</Text>
        </View>

        <View style={styles.headerText}>
          <Text style={styles.brandName}>Chef's</Text>
          <Text style={styles.brandSubtitle}>MENU MANAGER</Text>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={[styles.modeToggle, viewMode === "Chef" && styles.modeToggleActive]}
            onPress={() => setViewMode("Chef")}
          >
            <Text style={[styles.modeToggleText, viewMode === "Chef" && styles.modeToggleTextActive]}>Chef</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modeToggle, viewMode === "User" && styles.modeToggleActive]}
            onPress={() => setViewMode("User")}
          >
            <Text style={[styles.modeToggleText, viewMode === "User" && styles.modeToggleTextActive]}>User</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.navigation}>
        {viewMode === "Chef" ? (
          <>
            <TouchableOpacity
              style={[styles.navButton, screen === "Menu" && styles.navActive]}
              onPress={() => setScreen("Menu")}
            >
              <Text style={[styles.navText, screen === "Menu" && styles.navTextActive]}>
                🍽 Menu
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.navButton, screen === "Statistics" && styles.navActive]}
              onPress={() => setScreen("Statistics")}
            >
              <Text
                style={[styles.navText, screen === "Statistics" && styles.navTextActive]}
              >
                📊 Statistics
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={[styles.navButton, styles.navActive]}>
            <Text style={[styles.navText, styles.navTextActive]}>🛒 Order Menu</Text>
          </TouchableOpacity>
        )}
      </View>

      {viewMode === "Chef" ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.hero}>
            <View style={styles.heroTextContainer}>
              <Text style={styles.heroSmall}>WELCOME TO CHEF'S MENU MANAGER</Text>
              <Text style={styles.heroTitle}>{`Good Food.\nGood Mood!`}</Text>
              <Text style={styles.heroDescription}>
                Organise your menu, manage your dishes and keep your customers coming back.
              </Text>
              <TouchableOpacity
                style={styles.heroButton}
                onPress={() => setScreen("Menu")}
              >
                <Text style={styles.heroButtonText}>Explore Menu →</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.heroEmoji}>🍔</Text>
          </View>

          <View style={styles.quickStats}>
            <StatCard title="Total Items" value={String(totalItems)} emoji="🍴" />
            <StatCard title="Average Price" value={formatPrice(averagePrice)} emoji="💰" />
            <StatCard title="Categories" value="3" emoji="⭐" />
          </View>

          {screen === "Menu" ? (
            <>
              <View style={styles.headingRow}>
                <SectionTitle
                  title="Explore the Menu"
                  subtitle="Discover delicious choices"
                />

                <TouchableOpacity style={styles.addButton} onPress={openAddForm}>
                  <Text style={styles.addButtonText}>+ Add Item</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.smallHeading}>BROWSE CATEGORIES</Text>

              <View style={styles.categoryShortcuts}>
                {[
                  { name: "Food" as Category, emoji: "🍔", count: foodCount },
                  { name: "Drinks" as Category, emoji: "🥤", count: drinksCount },
                  { name: "Desserts" as Category, emoji: "🍰", count: dessertCount },
                ].map((item) => (
                  <TouchableOpacity
                    key={item.name}
                    onPress={() => setCategory(item.name)}
                    style={[
                      styles.shortcutButton,
                      category === item.name && styles.shortcutButtonActive,
                    ]}
                  >
                    <Text style={styles.shortcutEmoji}>{item.emoji}</Text>
                    <Text style={styles.shortcutText}>{item.name}</Text>
                    <Text style={styles.shortcutCount}>{item.count}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.filterPanel}>
                <TextInput
                  style={styles.searchInput}
                  value={search}
                  onChangeText={setSearch}
                  placeholder="Search menu items..."
                  placeholderTextColor={COLORS.muted}
                />

                <View style={styles.chipGroup}>
                  {(["All", "Food", "Drinks", "Desserts"] as const).map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      active={category === value}
                      onPress={() => setCategory(value === "All" ? "All" : value)}
                    />
                  ))}
                </View>

                <View style={styles.chipGroup}>
                  {(["All", "Starter", "Main Course", "Dessert"] as const).map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      active={course === value}
                      onPress={() => setCourse(value === "All" ? "All" : value)}
                    />
                  ))}
                </View>

                {(search || category !== "All" || course !== "All") && (
                  <TouchableOpacity onPress={clearFilters} style={styles.clearButton}>
                    <Text style={styles.clearButtonText}>Clear filters</Text>
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.menuList}>
                {filteredMenu.length === 0 ? (
                  <Text style={styles.emptyText}>No menu items match your search.</Text>
                ) : (
                  filteredMenu.map((item) => (
                    <MenuCard
                      key={item.id}
                      item={item}
                      onEdit={() => openEditForm(item)}
                      onDelete={() => deleteItem(item)}
                      onToggle={() => toggleAvailability(item)}
                    />
                  ))
                )}
              </View>
            </>
          ) : (
            <View style={styles.statScreen}>
              <View style={styles.statPanel}>
                <Text style={styles.statPanelTitle}>Menu Summary</Text>

                <View style={styles.statSummary}>
                  <View style={styles.statSummaryCard}>
                    <Text style={styles.statSummaryValue}>{totalItems}</Text>
                    <Text style={styles.statSummaryLabel}>Menu Items</Text>
                  </View>
                  <View style={styles.statSummaryCard}>
                    <Text style={styles.statSummaryValue}>{formatPrice(averagePrice)}</Text>
                    <Text style={styles.statSummaryLabel}>Average Price</Text>
                  </View>
                </View>

                <View style={styles.statGrid}>
                  <View style={styles.statRow}>
                    <Text style={styles.statRowLabel}>Food</Text>
                    <Text style={styles.statRowValue}>{foodCount}</Text>
                  </View>
                  <View style={styles.statRow}>
                    <Text style={styles.statRowLabel}>Drinks</Text>
                    <Text style={styles.statRowValue}>{drinksCount}</Text>
                  </View>
                  <View style={styles.statRow}>
                    <Text style={styles.statRowLabel}>Desserts</Text>
                    <Text style={styles.statRowValue}>{dessertCount}</Text>
                  </View>
                  <View style={styles.statRow}>
                    <Text style={styles.statRowLabel}>Starters</Text>
                    <Text style={styles.statRowValue}>{starterCount}</Text>
                  </View>
                  <View style={styles.statRow}>
                    <Text style={styles.statRowLabel}>Main Courses</Text>
                    <Text style={styles.statRowValue}>{mainCount}</Text>
                  </View>
                  <View style={styles.statRow}>
                    <Text style={styles.statRowLabel}>Dessert Courses</Text>
                    <Text style={styles.statRowValue}>{dessertCourseCount}</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.userScrollContent}
        >
          <View style={styles.userHero}>
            <Text style={styles.userHeroTitle}>Order your favourites</Text>
            <Text style={styles.userHeroSubtitle}>Fresh meals, drinks and desserts ready to order.</Text>
          </View>

          <View style={styles.filterPanel}>
            <TextInput
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
              placeholder="Search menu items..."
              placeholderTextColor={COLORS.muted}
            />

            <View style={styles.chipGroup}>
              {(["All", "Food", "Drinks", "Desserts"] as const).map((value) => (
                <Chip
                  key={value}
                  label={value}
                  active={category === value}
                  onPress={() => setCategory(value === "All" ? "All" : value)}
                />
              ))}
            </View>

            <View style={styles.chipGroup}>
              {(["All", "Starter", "Main Course", "Dessert"] as const).map((value) => (
                <Chip
                  key={value}
                  label={value}
                  active={course === value}
                  onPress={() => setCourse(value === "All" ? "All" : value)}
                />
              ))}
            </View>

            {(search || category !== "All" || course !== "All") && (
              <TouchableOpacity onPress={clearFilters} style={styles.clearButton}>
                <Text style={styles.clearButtonText}>Clear filters</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.cartSummary}>
            <Text style={styles.cartSummaryTitle}>Your cart</Text>
            <Text style={styles.cartSummaryValue}>{cartItems.reduce((sum, item) => sum + item.quantity, 0)} items</Text>
            <Text style={styles.cartSummaryTotal}>{formatPrice(cartTotal)}</Text>
            <TouchableOpacity style={styles.checkoutButton} onPress={openCheckout}>
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.userMenuGrid}>
            {userVisibleMenu.length === 0 ? (
              <Text style={styles.emptyText}>No menu items match your search.</Text>
            ) : (
              userVisibleMenu.map((item) => (
                <CustomerMenuCard
                  key={item.id}
                  item={item}
                  quantity={cart[item.id] ?? 0}
                  onAdd={() => addToCart(item)}
                  onDecrease={() => decreaseQuantity(item.id)}
                  onRemove={() => removeFromCart(item.id)}
                />
              ))
            )}
          </View>
        </ScrollView>
      )}

      <Modal visible={checkoutVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Checkout</Text>

            <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
              <TextInput
                style={styles.modalInput}
                placeholder="Your name"
                value={customerName}
                onChangeText={setCustomerName}
                placeholderTextColor={COLORS.muted}
              />

              <TextInput
                style={styles.modalInput}
                placeholder="Phone number"
                keyboardType="phone-pad"
                value={customerPhone}
                onChangeText={setCustomerPhone}
                placeholderTextColor={COLORS.muted}
              />

              <TextInput
                style={[styles.modalInput, styles.modalTextarea]}
                multiline
                placeholder="Delivery notes (optional)"
                value={deliveryNotes}
                onChangeText={setDeliveryNotes}
                placeholderTextColor={COLORS.muted}
              />

              <Text style={styles.modalSectionLabel}>Payment method</Text>
              <View style={styles.modalGrid}>
                {(["Card", "Cash", "Wallet"] as const).map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.modalChoice,
                      paymentMethod === option && styles.modalChoiceActive,
                    ]}
                    onPress={() => setPaymentMethod(option)}
                  >
                    <Text
                      style={[
                        styles.modalChoiceText,
                        paymentMethod === option && styles.modalChoiceTextActive,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.checkoutSummaryBox}>
                <Text style={styles.checkoutSummaryLabel}>Order total</Text>
                <Text style={styles.checkoutSummaryValue}>{formatPrice(cartTotal)}</Text>
              </View>
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setCheckoutVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveButton} onPress={completeCheckout}>
                <Text style={styles.saveButtonText}>Place order</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}> {editingId ? "Edit Menu Item" : "Add New Menu Item"}</Text>

            <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
              <TextInput
                style={styles.modalInput}
                placeholder="Item name"
                value={draft.name}
                onChangeText={(value) => updateDraft("name", value)}
                placeholderTextColor={COLORS.muted}
              />

              <TextInput
                style={[styles.modalInput, styles.modalTextarea]}
                multiline
                placeholder="Description"
                value={draft.description}
                onChangeText={(value) => updateDraft("description", value)}
                placeholderTextColor={COLORS.muted}
              />

              <TextInput
                style={styles.modalInput}
                placeholder="Price"
                keyboardType="decimal-pad"
                value={draft.price}
                onChangeText={(value) => updateDraft("price", value)}
                placeholderTextColor={COLORS.muted}
              />

              <TextInput
                style={styles.modalInput}
                placeholder="Image URL (optional)"
                value={draft.image}
                onChangeText={(value) => updateDraft("image", value)}
                placeholderTextColor={COLORS.muted}
              />

              <Text style={styles.modalSectionLabel}>Category</Text>
              <View style={styles.modalGrid}>
                {(["Food", "Drinks", "Desserts"] as Category[]).map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.modalChoice,
                      draft.category === option && styles.modalChoiceActive,
                    ]}
                    onPress={() => updateDraft("category", option)}
                  >
                    <Text
                      style={[
                        styles.modalChoiceText,
                        draft.category === option && styles.modalChoiceTextActive,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.modalSectionLabel}>Course</Text>
              <View style={styles.modalGrid}>
                {(["Starter", "Main Course", "Dessert"] as Course[]).map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.modalChoice,
                      draft.course === option && styles.modalChoiceActive,
                    ]}
                    onPress={() => updateDraft("course", option)}
                  >
                    <Text
                      style={[
                        styles.modalChoiceText,
                        draft.course === option && styles.modalChoiceTextActive,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={closeForm}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveButton} onPress={saveItem}>
                <Text style={styles.saveButtonText}>Save Item</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {notification && (
        <View style={[styles.notificationBanner, { backgroundColor: notification.tone === "success" ? COLORS.green : COLORS.orange }]}>
          <Text style={styles.notificationText}>{notification.text}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 16,
    backgroundColor: "#F8F3FF",
    borderBottomWidth: 1,
    borderBottomColor: "#E9DDFB",
    shadowColor: "#7B2CF5",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  logoCircle: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "linear-gradient(135deg, #7B2CF5, #FF8C2C)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
    shadowColor: "#7B2CF5",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  logoEmoji: {
    fontSize: 24,
  },
  headerText: {
    flex: 1,
    marginLeft: 12,
  },
  brandName: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.ink,
  },
  brandSubtitle: {
    fontSize: 12,
    letterSpacing: 2,
    color: "#6A4D9A",
    fontWeight: "700",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    minWidth: 220,
    justifyContent: "flex-end",
  },
  modeToggle: {
    backgroundColor: "#F0E7FF",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#E2D2FF",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 94,
    minHeight: 42,
  },
  modeToggleActive: {
    backgroundColor: COLORS.orange,
    borderColor: COLORS.orangeLight,
  },
  modeToggleText: {
    color: "#5F3B84",
    fontWeight: "800",
    fontSize: 16,
    lineHeight: 20,
  },
  modeToggleTextActive: {
    color: COLORS.white,
  },
  navigation: {
    flexDirection: "row",
    paddingHorizontal: 18,
    paddingTop: 16,
    gap: 10,
  },
  navButton: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 12,
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#7B2CF5",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  navActive: {
    backgroundColor: COLORS.purple,
    borderColor: COLORS.purpleLight,
  },
  navText: {
    color: "#5F3B84",
    fontWeight: "800",
    fontSize: 18,
    lineHeight: 22,
  },
  navTextActive: {
    color: COLORS.white,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingBottom: 40,
  },
  hero: {
    backgroundColor: COLORS.white,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 18,
    padding: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#7B2CF5",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  heroTextContainer: {
    flex: 1,
    paddingRight: 12,
  },
  heroSmall: {
    color: COLORS.orange,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.6,
  },
  heroTitle: {
    color: COLORS.ink,
    fontSize: 36,
    fontWeight: "900",
    marginTop: 10,
    lineHeight: 42,
  },
  heroDescription: {
    color: "#5F4E77",
    fontSize: 16,
    marginTop: 10,
    lineHeight: 26,
  },
  heroButton: {
    backgroundColor: COLORS.orange,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 14,
    marginTop: 16,
    alignSelf: "flex-start",
    shadowColor: "#FF8C2C",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  heroButtonText: {
    color: COLORS.white,
    fontWeight: "800",
    fontSize: 16,
  },
  heroEmoji: {
    fontSize: 78,
    textAlign: "center",
  },
  quickStats: {
    flexDirection: "row",
    marginTop: 18,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    alignItems: "center",
    shadowColor: "#7B2CF5",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  statEmoji: {
    fontSize: 22,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.ink,
    marginTop: 6,
  },
  statTitle: {
    color: "#5F4E77",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 4,
  },
  sectionTitleContainer: {
    flex: 1,
  },
  sectionTitle: {
    color: COLORS.ink,
    fontSize: 28,
    fontWeight: "800",
  },
  sectionSubtitle: {
    color: "#6A4D9A",
    fontSize: 14,
    marginTop: 4,
  },
  headingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: COLORS.purple,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: "#7B2CF5",
    shadowOpacity: 0.24,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  addButtonText: {
    color: COLORS.white,
    fontWeight: "800",
    fontSize: 15,
  },
  smallHeading: {
    color: COLORS.orange,
    fontSize: 12,
    letterSpacing: 1.6,
    fontWeight: "800",
    marginTop: 8,
    marginBottom: 10,
  },
  categoryShortcuts: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
    gap: 10,
  },
  shortcutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#7B2CF5",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  shortcutButtonActive: {
    backgroundColor: COLORS.softPurple,
    borderColor: COLORS.purpleLight,
  },
  shortcutEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  shortcutText: {
    color: COLORS.ink,
    fontWeight: "700",
    marginRight: 8,
    fontSize: 15,
  },
  shortcutCount: {
    color: "#6A4D9A",
    fontWeight: "700",
    fontSize: 14,
  },
  filterPanel: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    marginBottom: 20,
    shadowColor: "#7B2CF5",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  searchInput: {
    backgroundColor: "#F5ECFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E6D7FF",
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: COLORS.ink,
    marginBottom: 12,
  },
  chipGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
    gap: 8,
  },
  chip: {
    backgroundColor: "#F5ECFF",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#E8D8FF",
  },
  activeChip: {
    backgroundColor: COLORS.orange,
    borderColor: COLORS.orangeLight,
  },
  chipText: {
    color: "#543A7D",
    fontWeight: "700",
    fontSize: 14,
  },
  activeChipText: {
    color: COLORS.white,
  },
  clearButton: {
    marginTop: 12,
    alignSelf: "flex-start",
    backgroundColor: "#F3EAFF",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E3D0FF",
  },
  clearButtonText: {
    color: "#5A3B8A",
    fontWeight: "700",
    fontSize: 14,
  },
  menuList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 18,
    columnGap: 14,
    paddingBottom: 10,
  },
  menuCard: {
    width: "31.5%",
    minHeight: 620,
    backgroundColor: COLORS.card,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  foodImage: {
    width: "100%",
    height: 300,
    backgroundColor: "#F3EAFE",
    borderBottomWidth: 0,
    borderBottomColor: "rgba(255,255,255,0.08)",
  },
  menuCardContent: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  categoryLabel: {
    color: COLORS.orangeLight,
    fontWeight: "800",
    fontSize: 11,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  price: {
    color: COLORS.white,
    fontWeight: "800",
    fontSize: 20,
  },
  itemName: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 8,
  },
  itemDescription: {
    color: COLORS.muted,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
    minHeight: 54,
  },
  itemDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  courseLabel: {
    color: COLORS.purpleLight,
    fontWeight: "700",
    fontSize: 12,
    textTransform: "uppercase",
  },
  availability: {
    color: COLORS.green,
    fontWeight: "700",
    fontSize: 12,
  },
  unavailable: {
    color: COLORS.red,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 4,
  },
  editButton: {
    flex: 1,
    backgroundColor: "#4B2E67",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(174, 123, 255, 0.35)",
  },
  pauseButton: {
    flex: 1,
    backgroundColor: "#2E4E68",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(93, 151, 255, 0.35)",
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#5B3144",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 107, 122, 0.35)",
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "800",
    fontSize: 14,
  },
  pauseText: {
    color: COLORS.white,
    fontWeight: "800",
    fontSize: 14,
  },
  emptyText: {
    color: COLORS.muted,
    textAlign: "center",
    marginTop: 24,
    fontSize: 15,
  },
  statScreen: {
    marginTop: 18,
  },
  statPanel: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
    shadowColor: "#7B2CF5",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  statPanelTitle: {
    color: COLORS.ink,
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 16,
  },
  statSummary: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 18,
  },
  statSummaryCard: {
    flex: 1,
    backgroundColor: "#F4EDFF",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5D7FF",
  },
  statSummaryValue: {
    color: COLORS.purple,
    fontSize: 26,
    fontWeight: "800",
  },
  statSummaryLabel: {
    color: "#5F4E77",
    marginTop: 6,
    fontWeight: "700",
    fontSize: 14,
  },
  statGrid: {
    gap: 10,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F9F5FF",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#E6D8FF",
  },
  statRowLabel: {
    color: COLORS.ink,
    fontWeight: "700",
    fontSize: 16,
  },
  statRowValue: {
    color: COLORS.purple,
    fontWeight: "800",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(30, 18, 49, 0.5)",
    justifyContent: "center",
    padding: 18,
  },
  modalCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
    maxHeight: "85%",
    shadowColor: "#7B2CF5",
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  modalTitle: {
    color: COLORS.ink,
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 14,
  },
  modalScroll: {
    maxHeight: 420,
  },
  modalInput: {
    backgroundColor: "#F7F1FF",
    borderWidth: 1,
    borderColor: "#E7D9FF",
    borderRadius: 12,
    color: COLORS.ink,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
  },
  modalTextarea: {
    minHeight: 90,
    textAlignVertical: "top",
  },
  modalSectionLabel: {
    color: COLORS.orange,
    fontWeight: "800",
    fontSize: 13,
    marginTop: 6,
    marginBottom: 8,
  },
  modalGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  modalChoice: {
    backgroundColor: "#F6F0FF",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E7D9FF",
  },
  modalChoiceActive: {
    backgroundColor: COLORS.purple,
    borderColor: COLORS.purpleLight,
  },
  modalChoiceText: {
    color: "#543A7D",
    fontWeight: "700",
    fontSize: 14,
  },
  modalChoiceTextActive: {
    color: COLORS.white,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#F0E7FF",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2D2FF",
  },
  cancelButtonText: {
    color: COLORS.ink,
    fontWeight: "800",
    fontSize: 15,
  },
  saveButton: {
    flex: 1,
    backgroundColor: COLORS.orange,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    shadowColor: "#FF8C2C",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  saveButtonText: {
    color: COLORS.white,
    fontWeight: "800",
    fontSize: 15,
  },
  userCard: {
    width: "31.5%",
    minHeight: 620,
    backgroundColor: COLORS.card,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
    marginBottom: 18,
  },
  userFoodImage: {
    width: "100%",
    height: 300,
    backgroundColor: "#F3EAFE",
  },
  userCardContent: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  userMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  userCategory: {
    color: COLORS.orangeLight,
    fontWeight: "800",
    fontSize: 11,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  userPrice: {
    color: COLORS.white,
    fontWeight: "800",
    fontSize: 20,
  },
  userName: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 8,
  },
  userDescription: {
    color: COLORS.muted,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
    minHeight: 54,
  },
  userActionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: COLORS.orange,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    shadowColor: "#FF8C2C",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  addToCartText: {
    color: COLORS.white,
    fontWeight: "800",
    fontSize: 15,
  },
  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    gap: 8,
  },
  qtyButton: {
    backgroundColor: "#F5ECFF",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#E6D7FF",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
  },
  qtyText: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.ink,
  },
  qtyValue: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.ink,
    minWidth: 24,
    textAlign: "center",
  },
  removeBtn: {
    backgroundColor: "#F9D6D6",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#F5C2C2",
    alignItems: "center",
    justifyContent: "center",
  },
  removeText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#C0392B",
  },
  userHero: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
    marginTop: 18,
    marginBottom: 12,
    shadowColor: "#7B2CF5",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  userHeroTitle: {
    color: COLORS.ink,
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 4,
  },
  userHeroSubtitle: {
    color: COLORS.muted,
    fontSize: 16,
    lineHeight: 24,
  },
  cartSummary: {
    backgroundColor: "#F4EDFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#E5D7FF",
    shadowColor: "#7B2CF5",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  cartSummaryTitle: {
    color: COLORS.ink,
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 8,
  },
  cartSummaryValue: {
    color: COLORS.ink,
    fontWeight: "800",
    fontSize: 18,
    marginBottom: 4,
  },
  cartSummaryTotal: {
    color: COLORS.purple,
    fontWeight: "800",
    fontSize: 18,
    marginBottom: 12,
  },
  checkoutButton: {
    backgroundColor: COLORS.orange,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    shadowColor: "#FF8C2C",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  checkoutText: {
    color: COLORS.white,
    fontWeight: "800",
    fontSize: 16,
  },
  userMenuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 18,
    columnGap: 14,
  },
  userScrollContent: {
    paddingHorizontal: 18,
    paddingBottom: 40,
  },
  checkoutSummaryBox: {
    backgroundColor: "#F4EDFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5D7FF",
    padding: 14,
    marginTop: 12,
  },
  checkoutSummaryLabel: {
    color: COLORS.ink,
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 4,
  },
  checkoutSummaryValue: {
    color: COLORS.purple,
    fontWeight: "800",
    fontSize: 20,
  },
  notificationBanner: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  notificationText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 16,
  },
});