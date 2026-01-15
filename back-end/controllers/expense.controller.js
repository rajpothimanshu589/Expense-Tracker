import { Expense } from "../models/expense.model.js";

export const addExpense = async (req, res) => {
    try {
        const { description, amount, category } = req.body;
        const userId = req.userId
        if (!description || !amount || !category) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
             })
        };

        const expense = await Expense.create({
            description,
            amount,
            category,
            userId
        })

        return res.json({
            message: "New Expense Added",
            expense,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const getAllExpense = async (req, res) => {
  try {
    // ✅ Consistent user id from middleware
    const userId = req.userId || req.user?._id;

    const { category = "all", done = "all" } = req.query;

    // ✅ Base filter always by user
    const query = { userId };

    // ✅ Filter by category (unless "all")
    if (category.toLowerCase() !== "all") {
      query.category = { $regex: category, $options: "i" };
    }

    // ✅ Filter by done/undone (unless "all")
    if (done.toLowerCase() === "done") query.done = true;
    else if (done.toLowerCase() === "undone") query.done = false;

    // ✅ Fetch data
    const expenses = await Expense.find(query).sort({ createdAt: -1 });

    // ✅ Always respond with success, even if empty
    return res.status(200).json({
      success: true,
      expense: expenses,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching expenses",
      error: error.message,
    });
  }
};



export const markAsDoneORUndone = async (req, res) => {
    try {
        const expenseId = req.params.id;
        const done = req.body;
        const expense = await Expense.findByIdAndUpdate(expenseId, done, { new:true})

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found.",
                success: false
            })
        }
        return res.status(200).json({
            message: `Expense mark as ${expense.done ? 'done' : 'undone'}`,
            success: true
        })

    } catch (error) {
        console.log(error)
    }
}



export const removeExpense = async (req, res) => {

    try {
        const expenseId = req.params.id;
        await Expense.findByIdAndDelete(expenseId);
        return res.status(200).json({
            message: "Expense removed.",
            success: true
        })

    } catch (error) {
        console.log(error);
    }

}


export const updateExpense = async (req, res) => {
    try {
        const { description, amount, category } = req.body;
        const expenseId = req.params.id;
        const updateData = { description, amount, category };

        const expense = await Expense.findByIdAndUpdate(expenseId, updateData, { new:true });
        return res.status(200).json({
            message: "Expense updted.",
            expense,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
} 
