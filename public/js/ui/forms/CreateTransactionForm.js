/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
    this.element = element;
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const accountsList = this.element.querySelector(".accounts-select");

    accountsList.innerHTML = "";
    const data = User.current();
    Account.list(data, (err, response) => {
      if (response && response.success) {
        response.data.forEach((account) =>
          accountsList.insertAdjacentHTML(
            "beforeend",
            `<option value="${account.id}">${account.name}</option>`
          )
        );
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response && response.success) {
        let formName;
        switch (data.type) {
          case "expense":
            formName = "newExpense";
            break;
          case "income":
            formName = "newIncome";
            break;
        }
        document.forms[`new-${data.type}-form`].reset();
        App.getModal(formName).close();
        App.update();
      }
    });
  }
}
