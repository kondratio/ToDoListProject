const tasks = [
	{
		_id: '5d2ca9e2e03d40b326596aa7',
		completed: true,
		body:
			'woke up at 8′o clock\r\n',
		title: 'Waking up',
	},
	{
		_id: '5d2ca9e29c8a94095c1288e0',
		completed: false,
		body:
			'Learning JS topic "closures"\r\n',
		title:
			'JS topic',
	},
	{
		_id: '5d2ca9e2e03d40b3232496aa7',
		completed: true,
		body:
			'complete JS course on udemy\r\n',
		title: 'udemy',
	},
	{
		_id: '5d2ca9e29c8a94095564788e0',
		completed: false,
		body:
			'walking in park today\r\n',
		title:
			'Walking',
	},
];

(function (arrOfTasks) {
	const listContainer = document.querySelector('.tab-content ul');
	const objOfTasks = arrOfTasks.reduce((acc, obj) => {
		acc[obj._id] = obj;
		return acc;
	}, {});

	renderAllTasks(objOfTasks);

	function renderAllTasks(tasksList) {

		if (!tasksList) {
			console.log("Передайте список задач");
			return;
		}

		const allTasks = document.getElementById("alltasks").children;
		const category = document.querySelector('.category');

		const form = document.forms.addTask;
		const inputTitle = form.elements.title;
		const inputBody = form.elements['body'];

		const task = document.querySelector(".tab-content ul");

		document.addEventListener("DOMContentLoaded", function () {
			toCheckCategory();
		})

		task.addEventListener("click", onClickButton);

		category.addEventListener("click", onSubmitCategory);
		form.addEventListener("submit", OnSubmitHandler);

		const fragment = document.createDocumentFragment();

		Object.values(tasksList).forEach(task => {
			const li = ListItemTemplate(task);
			fragment.appendChild(li);
		})

		listContainer.appendChild(fragment);

		function addWarningLi() {
			const li = document.createElement('li');

			const p = document.createElement('p');
			li.classList.add("warning-li", "d-flex", "list-group-flush", "align-items-center", "flex-wrap", "uncompleted", "completed");
			p.classList.add("mt-2", "w-100", "text-center", "text-secondary");
			p.textContent = "Отсутствие задач в данной категории";

			li.appendChild(p);

			listContainer.insertAdjacentElement('afterbegin', li);
			console.log("li добавлено");
		}

		function ListItemTemplate({ _id, completed, body, title } = {}) {
			const li = document.createElement('li');

			const span = document.createElement('span');
			const btn = document.createElement('button');
			const deleteBtn = document.createElement('button')
			const p = document.createElement('p');

			span.classList.add("font-weight-bold")
			li.classList.add("d-none", "list-group-flush", "align-items-center", "flex-wrap");
			if (completed) {
				btn.classList.add("btn", "btn-warning", "ml-auto", "warning-btn");
				btn.textContent = "Восстановить";
				li.classList.add("completed");
			} else {
				btn.classList.add("btn", "btn-success", "ml-auto", "success-btn");
				btn.textContent = "Завершить";
				li.classList.add("uncompleted");
			}

			deleteBtn.classList.add("btn", "btn-danger", "ml-2", "danger-btn");
			deleteBtn.textContent = "Удалить";

			p.classList.add("mt-2", "w-100");
			li.id = _id;

			span.textContent = title;

			p.textContent = body;

			li.appendChild(span);
			li.appendChild(p);
			li.appendChild(btn);
			li.appendChild(deleteBtn);

			return li;
		}

		listContainer.appendChild(fragment);

		function OnSubmitHandler(event) {
			event.preventDefault();

			const titleValue = inputTitle.value;
			const bodyValue = inputBody.value;

			if (!titleValue || !bodyValue) {
				event.target.classList.add('was-validated');
				return;
			}

			const newTask = createNewTask(titleValue, bodyValue);
			const li = ListItemTemplate(newTask);
			listContainer.insertAdjacentElement('afterbegin', li);

			toCheckCategory();
			event.target.classList.remove('was-validated');
			form.reset();
		}

		function toCheckCategory(eventCategory = 0) {
			let currentCategory;
			if (eventCategory == 0) {
				currentCategory = category.querySelector('.nav-link.active').dataset.category;
			} else
				currentCategory = eventCategory;

			const infoCategory = showTasks(currentCategory, allTasks);

			console.log(currentCategory);
			console.log(infoCategory);

			if (infoCategory.n == 0) {
				addWarningLi();
				return;
			}
			if (infoCategory.warningLi) {
				if (infoCategory.n > 1) {
					const elem = document.querySelector(".warning-li");
					elem.remove();
				}
			}
		}


		function createNewTask(title, body) {

			const newTask = {
				_id: `task-${Math.random()}`,
				completed: false,
				body,
				title
			}

			objOfTasks[newTask._id] = newTask;
			return { ...newTask };
		}


		function showTasks(category, allTasks) {
			const check = {};
			let n = 0;
			let warningLi = false;

			switch (category) {
				case "all":
					for (let i = 0; i < allTasks.length; i++) {
						allTasks[i].classList.add("d-flex");
						n++;
						if (allTasks[i].classList.contains("warning-li")) {
							warningLi = true;
							console.log("сработало");
						}

					}

					//
					console.log(allTasks[0]);
					// [...allTasks].sort((a, b) => a.innerText > b.innerText ? 1 : -1)
					// 	.forEach(node => {
					// 		console.log(node);
					// 		var t = document.createTextNode("This is a paragraph.");
					// 		ii.appendChild(node)
					// 		ii.appendChild(t)
					// 	});


					// newArr.forEach(node => {
					// 	console.log(node);
					// 	ii.appendChild(node);
					// });

					/*
					var list = document.querySelector('#test-list');

					[...list.children]
											.sort((a,b)=>a.innerText>b.innerText?1:-1)
											.forEach(node=>list.appendChild(node));

					*/



					//


					return { n, warningLi };
				case "uncompleted":
					for (let i = 0; i < allTasks.length; i++) {
						if (allTasks[i].classList.contains("uncompleted")) {
							allTasks[i].classList.add("d-flex");
							n++;
							if (allTasks[i].classList.contains("warning-li")) {
								warningLi = true;
								console.log("сработало");
							}
						}
					}
					return { n, warningLi };
				case "completed":
					for (let i = 0; i < allTasks.length; i++) {
						if (allTasks[i].classList.contains("completed")) {
							allTasks[i].classList.add("d-flex");
							n++;
							if (allTasks[i].classList.contains("warning-li")) {
								warningLi = true;
								console.log("сработало");
							}
						}
					}
					return { n, warningLi };
				default: break;
			}
		}

		function onSubmitCategory(event) {
			const category = event.target.dataset.category;
			if (category == undefined) return;
			for (let i = 0; i < allTasks.length; i++) {
				allTasks[i].classList.remove("d-flex");
			}
			toCheckCategory(category);
		}

		function onClickButton(event) {
			const elem = event.target;
			if (elem.tagName != "BUTTON") return;
			const li = elem.parentElement;
			const button = defineButton(elem);
			const task = tasksList[li.id];

			switch (button) {
				case "btn-danger":
					delete tasksList[li.id];
					li.remove();
					break;

				case "btn-success":
					task["completed"] = true;
					let updateTask = ListItemTemplate(task);
					li.remove();
					listContainer.insertAdjacentElement('afterbegin', updateTask);
					break;

				case "btn-warning":
					task["completed"] = false;
					let updateTask2 = ListItemTemplate(task);
					li.remove();
					listContainer.insertAdjacentElement('afterbegin', updateTask2);
					break;

				default:
					console.log("error");
					break;
			}
			toCheckCategory();
		}

		function defineButton(elem) {
			if (elem.classList.contains("btn-danger")) return "btn-danger";
			if (elem.classList.contains("btn-success")) return "btn-success";
			if (elem.classList.contains("btn-warning")) return "btn-warning";
		}
	}
})(tasks);


const str1 = "racecar";

function checkPalindrome(str) {
	reverseStr = str.split("").reverse().join("");
	if (str === reverseStr) {
		return true;
	}
	return false;
}

const newStr = checkPalindrom(str1);
console.log(newStr);