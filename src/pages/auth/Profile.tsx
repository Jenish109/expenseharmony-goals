
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/auth/Navigation";
import { useAuth } from "@/context/AuthContext";

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateProfile({ name: formData.name });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <div className="container max-w-4xl mx-auto pt-24 pb-12 px-4">
        <div className="slide-in-from-bottom">
          <h1 className="text-3xl font-bold tracking-tight mb-6">Profile</h1>
          
          <div className="bg-card border rounded-xl shadow-sm p-6 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center text-xl font-semibold">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{user?.name}</h2>
                <p className="text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="max-w-md"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="max-w-md bg-muted"
                />
                <p className="text-xs text-muted-foreground">
                  Email cannot be changed
                </p>
              </div>
              
              <Button
                type="submit"
                disabled={isLoading || formData.name === user?.name}
              >
                {isLoading ? "Saving..." : "Save changes"}
              </Button>
            </form>
          </div>
          
          <div className="bg-card border rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Danger Zone</h2>
            <p className="text-muted-foreground mb-4">
              Actions here cannot be undone.
            </p>
            
            <Button variant="destructive">
              Delete account
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
