import React, { useState } from "react";
import FullLayout from "../../src/layouts/FullLayout";
import theme from "../../src/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { Grid, Stack, TextField, Button } from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";

const Add = () => {
  // const [form, setForm] = useState({});
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [availableQty, setAvaiableQty] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [brandname, setBrandname] = useState("");
  const onChange = async (e) => {
    // setForm({
    //   ...form,
    //   [e.target.name]: e.target.value,
    // });
    // console.log(form);
    if (e.target.name == "title") {
      setTitle(e.target.value);
    } else if (e.target.name == "slug") {
      setSlug(e.target.value);
    } else if (e.target.name == "price") {
      setPrice(e.target.value);
    } else if (e.target.name == "size") {
      setSize(e.target.value);
    } else if (e.target.name == "color") {
      setColor(e.target.value);
    } else if (e.target.name == "availableQty") {
      setAvaiableQty(e.target.value);
    } else if (e.target.name == "desc") {
      setDesc(e.target.value);
    } else if (e.target.name == "category") {
      setCategory(e.target.value);
    }
  };
  const submitForm = async (e) => {
    e.preventDefault();
    let data = { title, slug, price, color, size, availableQty, desc };
    console.log(data);
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addproducts`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await a.json();
    console.log(res);
    // setForm("");
  };
  return (
    <ThemeProvider theme={theme}>
      <style jsx global>
        {`
          footer {
            display: none;
          }
        `}
      </style>
      <FullLayout>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <BaseCard title="Add a product">
              <Stack spacing={3}>
                <TextField
                  onChange={onChange}
                  // value={form.title ? form.title : ""}
                  value={title}
                  name="title"
                  label="Title"
                  variant="outlined"
                />
                <TextField
                  onChange={onChange}
                  // value={form.slug ? form.slug : ""}
                  value={slug}
                  name="slug"
                  label="Slug"
                  variant="outlined"
                />
                <TextField
                  onChange={onChange}
                  // value={form.category ? form.category : ""}
                  value={category}
                  name="category"
                  label="Category"
                  variant="outlined"
                />
                <TextField
                  onChange={onChange}
                  // value={form.price ? form.price : ""}
                  value={price}
                  name="price"
                  label="Price"
                  variant="outlined"
                />
                <TextField
                  onChange={onChange}
                  // value={form.color ? form.color : ""}
                  value={color}
                  name="color"
                  label="Color"
                  variant="outlined"
                />
                <TextField
                  onChange={onChange}
                  // value={form.size ? form.size : ""}
                  value={size}
                  name="size"
                  label="Size"
                  variant="outlined"
                />
                <TextField
                  onChange={onChange}
                  // value={form.availableQty ? form.availableQty : ""}
                  value={availableQty}
                  name="availableQty"
                  label="Available Qty"
                  variant="outlined"
                />
                <TextField
                  onChange={onChange}
                  // value={form.brandname ? form.brandname : ""}
                  value={brandname}
                  name="brandname"
                  label="Brand Name"
                  variant="outlined"
                />

                <TextField
                  onChange={onChange}
                  // value={form.desc ? form.desc : ""}
                  value={desc}
                  name="desc"
                  label="Description"
                  multiline
                  rows={4}
                />
              </Stack>
              <br />
              <Button onClick={submitForm} variant="outlined" mt={2}>
                Submit
              </Button>
            </BaseCard>
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  );
};

export default Add;
