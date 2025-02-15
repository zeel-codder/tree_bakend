const { CategorySchema, CategoryModal } = require("../db");
const { getData } = require("./helper");

const Hello = async (req, res) => {
  try {
    res.status(200).send("hello I am zeel");
  } catch (e) {
    res.status(404).send("Error");
  }
};

const GetAll = async (req, res) => {
  try {
    const list = await CategoryModal.find({});

    res.status(200).send(list);
  } catch (e) {
    res.status(404).send("Error");
  }
};

const UpdateParent = async (parent, total) => {
  try {
    if (!parent) return;
    const parent_data = await CategoryModal.findById(parent);
    total = +total;
    await CategoryModal.findOneAndUpdate(
      { _id: parent },
      { target_sales_value: +parent_data.target_sales_value + total }
    );
    await UpdateParent(
      parent_data.parent,
      +parent_data.target_sales_value + total
    );
  } catch (e) {
    res.status(404).send("Error");
  }
};

const GetParent = async (id, data) => {
  try {
    if (!id) return;
    const parent_data = await CategoryModal.findById(id);

    data.push(parent_data);

    await GetParent(parent_data.parent, data);

    return;
  } catch (e) {
    res.status(404).send("Error");
  }
};

const AddNewCategory = async (req, res) => {
  try {
    let { name, target_sales_value, current_sales_value, parent } = req.body;

    const toadd = getData(current_sales_value, target_sales_value);

    if (parent) {
      const parent_data = await CategoryModal.findById(parent);

      const newNode = await CategoryModal({
        name,
        target_sales_value,
        current_sales_value,
        level: parent_data.level + 1,
        parent,
        ...toadd,
      });

      await UpdateParent(parent, target_sales_value);

      const data = await newNode.save();

      parent_data.child.push(data._id);
      await parent_data.save();

      res.status(200).send(data);
    } else {
      const newNode = await CategoryModal({
        name,
        target_sales_value,
        current_sales_value,
        level: 0,
        ...toadd,
      });

      const data = await newNode.save();

      res.status(200).send(data);
    }
  } catch (e) {
    res.status(404).send("Error");
  }
};

const GetLevelCategoryInfo = async (req, res) => {
  try {
    const { level } = req.params;

    const list = await CategoryModal.find({ level: level });

    res.status(200).send(list);
  } catch (e) {
    res.status(404).send("Error");
  }
};

const GetAllParentId = async (req, res) => {
  try {
    const { id } = req.params;

    const data = [];

    await GetParent(id, data);

    res.status(200).send(data);
  } catch (e) {
    res.status(404).send("Error");
  }
};

exports.Hello = Hello;
exports.AddNewCategory = AddNewCategory;
exports.GetAll = GetAll;
exports.GetLevelCategoryInfo = GetLevelCategoryInfo;
exports.GetAllParentId = GetAllParentId;
// exports.UpdateCategory=UpdateCategory;
// exports.DeleteCategory=DeleteCategory;
