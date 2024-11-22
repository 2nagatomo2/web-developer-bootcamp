# Yelp Camp

## Validation

### JOI

- validation 用の package

```javascript
const schema = Joi.object({
  campground: Joi.object({
    title: Joi.string().required(),
  }),
});
schema.validate(req.body);
```

- のようにして validation の schema とその validation を作成できる
- mongoose の schema とは別物なので注意
