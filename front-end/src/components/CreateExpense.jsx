import React, { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setExpenses } from '@/redux/expenseSlice';

const CreateExpense = () => {
  const [formData, setFormData] = useState({ description: '', amount: '', category: '' });
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { expenses } = useSelector(store => store.expense)

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const changeCategoryHandler = (value) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to add an expense.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/v1/expense/add",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        }
      );

      if (res.data.success) {
        dispatch(setExpenses([...expenses, res.data.expense]))
        toast.success(res.data.message);
        setIsOpen(false);
        // setFormData({ description: '', amount: '', category: '' }); // reset form
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to add expense.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add New Expense</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
          <DialogDescription>Create expense here. Click save when you're done.</DialogDescription>
        </DialogHeader>

        <form onSubmit={submitHandler}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label>Description</Label>
              <Input
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={changeEventHandler}
              />
            </div>

            <div className="grid gap-3">
              <Label>Amount</Label>
              <Input
                name="amount"
                placeholder="xxx-in ₹"
                value={formData.amount}
                onChange={changeEventHandler}
              />
            </div>

            <Select onValueChange={changeCategoryHandler}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="rent">Rent</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="salary">Salary</SelectItem>
                  <SelectItem value="shopping">Shopping</SelectItem>
                  <SelectItem value="others">Others</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            {loading ? (
              <Button className="w-full my-4">
                <Loader2 className="mr-2 h-4 animate-spin" />
                Please Wait..
              </Button>
            ) : (
              <Button type="submit" className="w-full">Add</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateExpense;
