
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ExpenseCategory, categoryInfo } from "@/lib/data";
import { Edit2, Trash2, Save, Plus, X } from "lucide-react";
import { toast } from "sonner";

interface CategoryManagerProps {
  onSave: (categories: any) => void;
}

export function CategoryManager({ onSave }: CategoryManagerProps) {
  const [categories, setCategories] = useState({...categoryInfo});
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState("#4CAF50");
  const [showAddForm, setShowAddForm] = useState(false);
  
  const handleEditCategory = (categoryKey: string) => {
    setEditingCategory(categoryKey);
  };
  
  const handleSaveEdit = (categoryKey: string, newLabel: string, newColor: string) => {
    if (!newLabel.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }
    
    setCategories(prev => ({
      ...prev,
      [categoryKey]: {
        ...prev[categoryKey as ExpenseCategory],
        label: newLabel,
        color: newColor
      }
    }));
    
    setEditingCategory(null);
    toast.success("Category updated");
  };
  
  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }
    
    // In a real app, we would need to handle creating new categories more robustly
    toast.info("Adding custom categories will be available in the next update!");
    
    setShowAddForm(false);
    setNewCategoryName("");
    setNewCategoryColor("#4CAF50");
  };
  
  const handleDeleteCategory = (categoryKey: string) => {
    // In a real app, we would need to handle deletion more carefully
    // Especially checking if any expenses use this category
    toast.info("Deleting categories will be available in the next update!");
  };
  
  const handleSaveCategories = () => {
    onSave(categories);
    toast.success("Categories saved successfully");
  };
  
  return (
    <div className="space-y-4">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        {Object.entries(categories).map(([key, { label, color }]) => (
          <Card key={key} className="border overflow-hidden">
            <CardContent className="p-0">
              {editingCategory === key ? (
                <div className="p-4 space-y-3">
                  <div>
                    <Label htmlFor={`category-${key}-name`}>Name</Label>
                    <Input 
                      id={`category-${key}-name`}
                      defaultValue={label}
                      onChange={(e) => label = e.target.value}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`category-${key}-color`}>Color</Label>
                    <div className="flex">
                      <Input 
                        id={`category-${key}-color`}
                        type="color"
                        className="w-16 h-10 p-1"
                        defaultValue={color}
                        onChange={(e) => color = e.target.value}
                      />
                      <Input 
                        value={color}
                        onChange={(e) => color = e.target.value}
                        className="flex-1 ml-2"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 pt-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => setEditingCategory(null)}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => handleSaveEdit(key, label, color)}
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <div 
                      className="h-8 w-8 rounded-full mr-3"
                      style={{ backgroundColor: color }}
                    ></div>
                    <span>{label}</span>
                  </div>
                  <div className="flex space-x-1">
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={() => handleEditCategory(key)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={() => handleDeleteCategory(key)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      {showAddForm ? (
        <Card className="border">
          <CardContent className="p-4 space-y-3">
            <div>
              <Label htmlFor="new-category-name">New Category Name</Label>
              <Input 
                id="new-category-name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="e.g., Travel"
              />
            </div>
            <div>
              <Label htmlFor="new-category-color">Color</Label>
              <div className="flex">
                <Input 
                  id="new-category-color"
                  type="color"
                  className="w-16 h-10 p-1"
                  value={newCategoryColor}
                  onChange={(e) => setNewCategoryColor(e.target.value)}
                />
                <Input 
                  value={newCategoryColor}
                  onChange={(e) => setNewCategoryColor(e.target.value)}
                  className="flex-1 ml-2"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <Button 
                variant="outline" 
                onClick={() => setShowAddForm(false)}
              >
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button onClick={handleAddCategory}>
                <Save className="h-4 w-4 mr-1" />
                Add Category
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => setShowAddForm(true)}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add New Category
        </Button>
      )}
      
      <Button className="w-full" onClick={handleSaveCategories}>
        <Save className="h-4 w-4 mr-1" />
        Save All Categories
      </Button>
    </div>
  );
}
