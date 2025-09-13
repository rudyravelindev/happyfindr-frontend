const simpleHash = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString();
};
class DatabaseService {
  constructor() {
    this.loadFromLocalStorage();

    if (this.users.size === 0) {
      this.nextUserId = 1;
      this.createUser({
        name: 'Demo User',
        email: 'demo@example.com',
        password: simpleHash('password123'),
      });
    }
  }

  loadFromLocalStorage() {
    const dbData = localStorage.getItem('appDatabase');
    if (dbData) {
      const parsedData = JSON.parse(dbData);
      this.users = new Map(parsedData.users);
      this.items = new Map(parsedData.items);
      this.nextUserId = parsedData.nextUserId;
      this.nextItemId = parsedData.nextItemId;
    } else {
      this.users = new Map();
      this.items = new Map();
      this.nextUserId = 1;
      this.nextItemId = 1;
    }
  }

  saveToLocalStorage() {
    const dbData = {
      users: Array.from(this.users.entries()),
      items: Array.from(this.items.entries()),
      nextUserId: this.nextUserId,
      nextItemId: this.nextItemId,
    };
    localStorage.setItem('appDatabase', JSON.stringify(dbData));
  }

  // User methods
  createUser(userData) {
    const id = this.nextUserId.toString();
    this.nextUserId++;

    const user = {
      id,
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Hash password before storing
    if (user.password) {
      user.password = simpleHash(user.password);
    }

    this.users.set(id, user);
    this.saveToLocalStorage();
    return user;
  }

  getUserById(id) {
    const user = this.users.get(id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return user;
  }

  getUserByEmail(email) {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return user;
      }
    }
    return null;
  }

  updateUser(id, updates) {
    const user = this.getUserById(id);

    if (updates.password) {
      updates.password = simpleHash(updates.password);
    }

    const updatedUser = {
      ...user,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.users.set(id, updatedUser);
    this.saveToLocalStorage();
    return updatedUser;
  }

  validateUser(email, password) {
    const user = this.getUserByEmail(email);
    if (!user) {
      return false;
    }
    return user.password === simpleHash(password);
  }

  // Item methods
  createItem(itemData) {
    const id = this.nextItemId.toString();
    this.nextItemId++;

    const item = {
      id,
      ...itemData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.items.set(id, item);
    this.saveToLocalStorage();
    return item;
  }

  getItemById(id) {
    const item = this.items.get(id);
    if (!item) {
      throw new Error(`Item with ID ${id} not found`);
    }
    return item;
  }

  getUserItems(userId) {
    const userItems = [];
    for (const item of this.items.values()) {
      if (item.userId === userId) {
        userItems.push(item);
      }
    }
    return userItems;
  }

  updateItem(id, updates) {
    const item = this.getItemById(id);
    const updatedItem = {
      ...item,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.items.set(id, updatedItem);
    this.saveToLocalStorage();
    return updatedItem;
  }

  deleteItem(id) {
    const deleted = this.items.delete(id);
    this.saveToLocalStorage();
    return deleted;
  }
}

// Create a singleton instance
const dbService = new DatabaseService();
export default dbService;
