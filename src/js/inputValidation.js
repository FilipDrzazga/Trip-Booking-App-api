const adminInputs = [{
    name: 'name',
    isReq: true,
    pattern: '\\D{3,}',
    type: 'text'
}, {
    name: 'description',
    isReq: true,
}, {
    name: 'adult',
    isReq: true,
    pattern: `^(\\d{1,3})|((\\.|,)\\d{0,2}$)`,
    type: 'number'
}, {
    name: 'child',
    isReq: true,
    pattern: '^(\\d{1,3})|((\\.|,)\\d{0,2}$)',
    type: 'number'
    }];

    const clientInputs = [
  {
    name: "adults",
    isReq: true,
    type: "number",
    pattern: '^[1-9]',
  }, {
    name: "children",
    isReq: true,
    type: "number",
    pattern: '^[0-9]',
  }, {
    name: "name",
    isReq: true,
    pattern: '\\D{3,}',
  }, {
    name: "email",
    isReq: true,
    pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
    }];

export { adminInputs, clientInputs };