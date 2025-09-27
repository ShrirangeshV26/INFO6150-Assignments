const USER_FULL_NAME = "Shrirangesh Vedanarayanan";
const USER_NUID = "2110110887";
const INITIAL_COUNT = 3;

// Table state
const tableBody = document.getElementById('tableBody');
const addBtn = document.getElementById('addBtn');
const submitBtn = document.getElementById('submitBtn');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalTitle = document.getElementById('modalTitle');
const modalInput = document.getElementById('modalInput');
const modalOk = document.getElementById('modalOk');
const modalCancel = document.getElementById('modalCancel');

let rows = [];
let availableIds = [];
let selectedSet = new Set();
let editingId = null;