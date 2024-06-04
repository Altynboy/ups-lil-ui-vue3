export const validFIO = {
  data() {
    return {
      options: {
        title: '',
        placeholder: '',
        format: null,
        maxlength: 30,
        minlength: null,
        tooltip: 'Обязательное поле',
        warn: 'Не соответствует формату',
        sintax: '^[А-Яа-я- ]$'
      }
    }
  }
}

export const validLoginPhone = {
  data() {
    return {
      options: {
        title: '',
        placeholder: '7xxx-xxx-xx-xx',
        format: '^\\+?\\d{4}-\\d{3}-\\d{2}-\\d{2}$',
        maxlength: 14,
        minlength: 14,
        tooltip: 'Обязательное поле',
        warn: 'Не соответствует формату',
        sintax: '^[0-9]$'
      }
    }
  }
}

export const validPhone = {
  data() {
    return {
      options: {
        title: '',
        placeholder: '',
        format: '^\\+[1-9]{1}[0-9]{3,14}$',
        maxlength: 14,
        minlength: null,
        tooltip: 'Обязательное поле',
        warn: 'Не соответствует формату',
        sintax: '^[0-9+]$'
      }
    }
  }
}

export const validEmail = {
  data() {
    return {
      options: {
        title: '',
        placeholder: 'Введите Email',
        format: '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$',
        maxlength: 30,
        minlength: null,
        tooltip: 'Обязательное поле',
        warn: 'Не соответствует формату',
        sintax: '^[A-Za-z@.-_]$'
      }
    }
  }
}

export const validIIN = {
  data() {
    return {
      options: {
        title: '',
        format: '^\\d{12}$',
        maxlength: 12,
        tooltip: 'Обязательное поле',
        warn: 'Не соответствует формату',
        sintax: '^[0-9]$'
      }
    }
  }
}

export const validKbe = {
  data() {
    return {
      options: {
        title: 'КБе',
        format: '^[1-2][1-9]$',
        maxlength: 2,
        tooltip: 'Обязательное поле',
        warn: 'Код КБе может быть только от 11 до 29',
        sintax: '^[0-9]$'
      }
    }
  }
}

export const validBin = {
  data() {
    return {
      options: {
        title: 'БИН',
        format: '^\\d{4}[4-6][0-3]\\d{6}$',
        maxlength: 12,
        tooltip: 'Обязательное поле',
        warn: 'Не соответствует формату',
        sintax: '^[0-9]$'
      }
    }
  }
}

export const validBik = {
  data() {
    return {
      options: {
        title: 'БИК',
        format: '^[A-Z]{8}$',
        maxlength: 8,
        tooltip: 'Обязательное поле',
        warn: 'Не соответствует формату',
        sintax: '^[A-z]$'
      }
    }
  }
}

export const validSubAcc = {
  data() {
    return {
      options: {
        // title: "Л/C",
        placeholder: 'Введите Л/С',
        format: '^\\d{1,10}$',
        maxlength: 10,
        minlength: 1,
        tooltip: 'Обязательное поле',
        warn: 'Не соответствует формату',
        sintax: '^[0-9]$'
      }
    }
  }
}

export const validAcc = {
  data() {
    return {
      options: {
        title: 'Счет',
        format: '^KZ\\d{18}$',
        maxlength: 20,
        tooltip: 'Обязательное поле',
        warn: 'Не соответствует формату',
        sintax: '^[A-z0-9]$'
      }
    }
  }
}

export const validTariff = {
  data() {
    return {
      options: {
        title: 'Тариф',
        format: '^\\d*.?\\d*$',
        maxlength: 10,
        minlength: null,
        tooltip: 'Обязательное поле',
        warn: 'Не соответствует формату',
        sintax: '[0-9.]'
      }
    }
  }
}
