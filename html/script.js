const bankingApp = Vue.createApp({
    data() {
        return {
            isBankOpen: false,
            isATMOpen: false,
            showPinPrompt: false,
            notification: null,
            activeView: "home",
            accounts: [],
            statements: {},
            selectedAccountStatement: "checking",
            playerName: "",
            accountNumber: "",
            playerCash: 0,
            selectedMoneyAccount: null,
            selectedMoneyAmount: 0,
            moneyReason: "",
            transferType: "internal",
            internalFromAccount: null,
            internalToAccount: null,
            internalTransferAmount: 0,
            externalAccountNumber: "",
            externalFromAccount: null,
            externalTransferAmount: 0,
            transferReason: "",
            debitPin: "",
            enteredPin: "",
            acceptablePins: [],
            tempBankData: null,
            createAccountName: "",
            createAccountAmount: 0,
            editAccount: null,
            editAccountName: "",
            manageAccountName: null,
            manageUserName: "",
            filteredUsers: [],
            showUsersDropdown: false,
            
            // Loans feature removed
            isPoliceChief: false,
            
            // New properties for analytics
            analyticsTab: "overview",
            analyticsPeriod: "month",
            forecastPeriod: 6,
            
            // Arabic translations
            translations: {
                // Navigation
                "home": "الرئيسية",
                "money": "الأموال",
                "transfer": "التحويل",
                "loans": "القروض",
                "analytics": "التحليلات",
                "settings": "الإعدادات",
                "logout": "تسجيل الخروج",
                
                // Account info
                "cash_balance": "رصيد النقدي",
                "total_account_balance": "إجمالي رصيد الحساب",
                "type": "النوع",
                "personal": "شخصي",
                "business": "تجاري",
                "iban": "رقم الحساب",
                
                // Transaction history
                "transaction_history": "سجل المعاملات",
                "date": "التاريخ",
                "id": "المعرف",
                "description": "الوصف",
                "amount": "المبلغ",
                "no_transactions": "لا توجد معاملات لهذا الحساب",
                
                // Money management
                "money_management": "إدارة الأموال",
                "deposit_withdraw": "إيداع وسحب",
                "select_account": "اختر الحساب",
                "enter_amount": "أدخل المبلغ",
                "reason": "السبب",
                "withdraw": "سحب",
                "deposit": "إيداع",
                
                // Transfer
                "internal": "داخلي",
                "external": "خارجي",
                "scheduled": "مجدول",
                "quickpay": "دفع سريع",
                "internal_transfer": "تحويل داخلي",
                "from_account": "من حساب",
                "to_account": "إلى حساب",
                "transfer_now": "تحويل الآن",
                "external_transfer": "تحويل خارجي",
                "recipient_account": "حساب المستلم",
                
                // Loans
                "apply": "تقديم طلب",
                "active": "نشط",
                "loan_application": "طلب قرض",
                "loan_amount": "مبلغ القرض",
                "loan_term": "مدة القرض",
                "months": "شهور",
                "purpose": "الغرض",
                "vehicle": "مركبة",
                "housing": "سكن",
                "business_loan": "قرض تجاري",
                "personal_loan": "قرض شخصي",
                "police_loan": "قرض رئيس الشرطة",
                "other": "أخرى",
                "apply_now": "تقديم الطلب الآن",
                "active_loans": "القروض النشطة",
                "loan_details": "تفاصيل القرض",
                "principal": "المبلغ الأساسي",
                "interest_rate": "معدل الفائدة",
                "monthly_payment": "الدفعة الشهرية",
                "remaining_payments": "الدفعات المتبقية",
                "total_remaining": "المبلغ المتبقي",
                "pay_installment": "دفع القسط",
                "pay_full": "سداد كامل",
                "pending_approval": "في انتظار الموافقة",
                "approved": "تمت الموافقة",
                "rejected": "مرفوض",
                "police_approval_required": "يتطلب موافقة رئيس الشرطة",
                "police_chief_panel": "لوحة رئيس الشرطة",
                "pending_loans": "القروض المعلقة",
                "no_pending_loans": "لا توجد قروض معلقة",
                "approve": "موافقة",
                "reject": "رفض",
                
                // Analytics
                "overview": "نظرة عامة",
                "spending": "الإنفاق",
                "income": "الدخل",
                "trends": "الاتجاهات",
                "forecast": "التوقعات",
                "financial_overview": "نظرة عامة مالية",
                "total_income": "إجمالي الدخل",
                "total_expenses": "إجمالي المصروفات",
                "net_flow": "التدفق الصافي",
                "savings_rate": "معدل الادخار",
                "financial_health": "الصحة المالية",
                "spending_by_category": "الإنفاق حسب الفئة",
                "insights": "رؤى",
                "top_expenses": "أعلى المصروفات",
                "spending_patterns": "أنماط الإنفاق",
                "by_time": "حسب الوقت",
                "by_day": "حسب اليوم",
                "top_merchants": "أكبر التجار",
                "income_sources": "مصادر الدخل",
                "income_stability": "استقرار الدخل",
                "monthly_income": "الدخل الشهري",
                "income_trends": "اتجاهات الدخل",
                "financial_trends": "الاتجاهات المالية",
                "category_trends": "اتجاهات الفئات",
                "anomalies": "الشذوذات",
                "cash_flow_forecast": "توقعات التدفق النقدي",
                "projected_savings": "الادخار المتوقع",
                "goal_projections": "توقعات الأهداف",
                
                // Settings
                "account_settings": "إعدادات الحساب",
                "create_account": "إنشاء حساب",
                "edit_account": "تعديل الحساب",
                "manage_access": "إدارة الوصول",
                "account_name": "اسم الحساب",
                "initial_deposit": "الإيداع الأولي",
                "create": "إنشاء",
                "edit": "تعديل",
                "delete": "حذف",
                "add_user": "إضافة مستخدم",
                "search_user": "البحث عن مستخدم",
                "add": "إضافة",
                "remove": "إزالة",
                
                // ATM
                "welcome_atm": "مرحبًا بك في الصراف الآلي",
                "enter_pin": "أدخل رقم التعريف الشخصي",
                "submit": "إرسال",
                "cancel": "إلغاء",
                
                // Notifications
                "success": "نجاح",
                "error": "خطأ",
                
                // Time periods
                "week": "أسبوع",
                "month": "شهر",
                "quarter": "ربع سنة",
                "year": "سنة",
                
                // Days of week
                "mon": "الإثنين",
                "tue": "الثلاثاء",
                "wed": "الأربعاء",
                "thu": "الخميس",
                "fri": "الجمعة",
                "sat": "السبت",
                "sun": "الأحد",
                
                // Additional translations
                "order_debit_card": "طلب بطاقة خصم",
                "order": "طلب",
                "next_payment": "الدفعة التالية",
                "no_active_loans": "لا توجد قروض نشطة",
                "please_fill_all_details": "يرجى ملء جميع التفاصيل",
                "loan": "قرض",
                "loan_approved": "تمت الموافقة على القرض",
                "has_been_deposited": "تم إيداعه في حسابك",
                "not_authorized": "غير مصرح به",
                "loan_not_found": "لم يتم العثور على القرض",
                "loan_for": "قرض لـ",
                "approved": "تمت الموافقة",
                "rejected": "مرفوض"
            },
            transactionCategories: {
                "Income": 0,
                "Shopping": 0,
                "Food": 0,
                "Transportation": 0,
                "Housing": 0,
                "Entertainment": 0,
                "Other": 0
            },
            categoryIcons: {
                "Income": "payments",
                "Shopping": "shopping_bag",
                "Food": "restaurant",
                "Transportation": "directions_car",
                "Housing": "home",
                "Entertainment": "movie",
                "Other": "more_horiz"
            },
            categoryColors: {
                "Income": "#4caf50",
                "Shopping": "#ff9800",
                "Food": "#f44336",
                "Transportation": "#2196f3",
                "Housing": "#9c27b0",
                "Entertainment": "#e91e63",
                "Other": "#607d8b"
            },
            monthlyData: {
                income: [4200, 4500, 4300, 4800, 5100, 4900],
                expenses: [3200, 3500, 3100, 3600, 3800, 3700],
                balance: [1000, 1000, 1200, 1200, 1300, 1200]
            },
            
            // New properties for savings goals
            goalAccount: null,
            goalName: "",
            goalAmount: 0,
            goalDate: "",
            savingsGoals: [],
            
            // New properties for scheduled transfers
            scheduledFromAccount: null,
            scheduledTransferType: "internal",
            scheduledToAccount: null,
            scheduledToNumber: "",
            scheduledAmount: 0,
            scheduledReason: "",
            scheduledDate: "",
            scheduledFrequency: "once",
            scheduledTransfers: [],
            
            // New properties for quick pay
            savedContacts: [],
            showAddContactForm: false,
            newContactName: "",
            newContactAccount: "",
            selectedContact: null,
            quickPayFromAccount: null,
            quickPayAmount: 0,
            quickPayReason: "",
        };
    },
    computed: {
        accountStatements() {
            if (this.selectedAccountStatement && this.statements[this.selectedAccountStatement]) {
                return this.statements[this.selectedAccountStatement];
            }
            return [];
        },
    },
    watch: {
        "manageAccountName.users": function () {
            this.filterUsers();
        },
    },
    methods: {
        openBank(bankData) {
            const playerData = bankData.playerData;
            this.playerName = playerData.charinfo.firstname;
            this.accountNumber = playerData.citizenid;
            this.playerCash = playerData.money.cash;
            this.accounts = [];
            bankData.accounts.forEach((account) => {
                this.accounts.push({
                    name: account.account_name,
                    type: account.account_type,
                    balance: account.account_balance,
                    users: account.users,
                    id: account.id,
                });
            });
            this.statements = {};
            Object.keys(bankData.statements).forEach((accountKey) => {
                this.statements[accountKey] = bankData.statements[accountKey].map((statement) => ({
                    id: statement.id,
                    date: statement.date,
                    reason: statement.reason,
                    amount: statement.amount,
                    type: statement.statement_type,
                    user: statement.citizenid,
                }));
            });
            this.isBankOpen = true;
        },
        openATM(bankData) {
            const playerData = bankData.playerData;
            this.playerName = playerData.charinfo.firstname;
            this.accountNumber = playerData.citizenid;
            this.playerCash = playerData.money.cash;
            this.accounts = [];
            bankData.accounts.forEach((account) => {
                this.accounts.push({
                    name: account.account_name,
                    type: account.account_type,
                    balance: account.account_balance,
                    users: account.users,
                    id: account.id,
                });
            });
            this.isATMOpen = true;
        },
        pinPrompt(enteredPin) {
            const bankData = this.tempBankData;
            this.acceptablePins = Array.from(bankData.pinNumbers);
            if (this.acceptablePins.includes(parseInt(enteredPin))) {
                this.showPinPrompt = false;
                this.openATM(bankData);
            }
        },
        withdrawMoney() {
            if (!this.selectedMoneyAccount || this.selectedMoneyAmount <= 0) {
                return;
            }
            axios
                .post("https://qb-banking/withdraw", {
                    accountName: this.selectedMoneyAccount.name,
                    amount: this.selectedMoneyAmount,
                    reason: this.moneyReason,
                })
                .then((response) => {
                    if (response.data.success) {
                        const account = this.accounts.find((acc) => acc.name === this.selectedMoneyAccount.name);
                        if (account) {
                            account.balance -= this.selectedMoneyAmount;
                            this.playerCash += this.selectedMoneyAmount;
                            this.addStatement(this.accountNumber, this.selectedMoneyAccount.name, this.moneyReason, this.selectedMoneyAmount, "withdraw");
                            this.selectedMoneyAmount = 0;
                            this.moneyReason = "";
                            this.selectedMoneyAccount = null;
                        }
                        this.addNotification(response.data.message, "success");
                    } else {
                        this.addNotification(response.data.message, "error");
                    }
                });
        },
        depositMoney() {
            if (!this.selectedMoneyAccount || this.selectedMoneyAmount <= 0) {
                return;
            }
            axios
                .post("https://qb-banking/deposit", {
                    accountName: this.selectedMoneyAccount.name,
                    amount: this.selectedMoneyAmount,
                    reason: this.moneyReason,
                })
                .then((response) => {
                    if (response.data.success) {
                        const account = this.accounts.find((acc) => acc.name === this.selectedMoneyAccount.name);
                        if (account) {
                            account.balance += this.selectedMoneyAmount;
                            this.playerCash -= this.selectedMoneyAmount;
                            this.addStatement(this.accountNumber, this.selectedMoneyAccount.name, this.moneyReason, this.selectedMoneyAmount, "deposit");
                            this.selectedMoneyAmount = 0;
                            this.moneyReason = "";
                            this.selectedMoneyAccount = null;
                        }
                        this.addNotification(response.data.message, "success");
                    } else {
                        this.addNotification(response.data.message, "error");
                    }
                });
        },
        internalTransfer() {
            if (!this.internalFromAccount || !this.internalToAccount || this.internalTransferAmount <= 0) {
                return;
            }
            axios
                .post("https://qb-banking/internalTransfer", {
                    fromAccountName: this.internalFromAccount.name,
                    toAccountName: this.internalToAccount.name,
                    amount: this.internalTransferAmount,
                    reason: this.transferReason,
                })
                .then((response) => {
                    if (response.data.success) {
                        const fromAccount = this.accounts.find((acc) => acc.name === this.internalFromAccount.name);
                        if (fromAccount) {
                            fromAccount.balance -= this.internalTransferAmount;
                        }
                        const toAccount = this.accounts.find((acc) => acc.name === this.internalToAccount.name);
                        if (toAccount) {
                            toAccount.balance += this.internalTransferAmount;
                        }
                        this.addStatement(this.accountNumber, this.internalFromAccount.name, this.transferReason, this.internalTransferAmount, "withdraw");
                        this.addStatement(this.accountNumber, this.internalToAccount.name, this.transferReason, this.internalTransferAmount, "deposit");
                        this.internalTransferAmount = 0;
                        this.transferReason = "";
                        this.internalFromAccount = null;
                        this.internalToAccount = null;
                        this.addNotification(response.data.message, "success");
                    } else {
                        this.addNotification(response.data.message, "error");
                    }
                });
        },
        externalTransfer() {
            if (!this.externalFromAccount || !this.externalAccountNumber || this.externalTransferAmount <= 0) {
                return;
            }
            axios
                .post("https://qb-banking/externalTransfer", {
                    fromAccountName: this.externalFromAccount.name,
                    toAccountNumber: this.externalAccountNumber,
                    amount: this.externalTransferAmount,
                    reason: this.transferReason,
                })
                .then((response) => {
                    if (response.data.success) {
                        const fromAccount = this.accounts.find((acc) => acc.name === this.externalFromAccount.name);
                        if (fromAccount) {
                            fromAccount.balance -= this.externalTransferAmount;
                        }
                        this.addStatement(this.accountNumber, this.externalFromAccount.name, this.transferReason, this.externalTransferAmount, "withdraw");
                        this.externalTransferAmount = 0;
                        this.transferReason = "";
                        this.externalFromAccount = null;
                        this.externalAccountNumber = "";
                        this.addNotification(response.data.message, "success");
                    } else {
                        this.addNotification(response.data.message, "error");
                    }
                });
        },
        orderDebitCard() {
            if (!this.debitPin) {
                return;
            }

            axios
                .post("https://qb-banking/orderCard", {
                    pin: this.debitPin,
                })
                .then((response) => {
                    if (response.data.success) {
                        this.debitPin = "";
                        this.addNotification(response.data.message, "success");
                    } else {
                        this.addNotification(response.data.message, "error");
                    }
                });
        },
        
        quickWithdraw(amount) {
            if (!this.selectedMoneyAccount) {
                this.addNotification("Please select an account first", "error");
                return;
            }
            
            this.selectedMoneyAmount = amount;
            this.moneyReason = "Quick withdrawal";
            this.withdrawMoney();
        },
        
        checkBalance() {
            if (!this.selectedMoneyAccount) {
                this.addNotification("Please select an account first", "error");
                return;
            }
            
            const balance = this.selectedMoneyAccount.balance;
            this.addNotification(`Current balance: $${this.formatCurrency(balance)}`, "success");
        },
        openAccount() {
            if (!this.createAccountName || this.createAccountAmount < 0) {
                return;
            }

            axios
                .post("https://qb-banking/openAccount", {
                    accountName: this.createAccountName,
                    amount: this.createAccountAmount,
                })
                .then((response) => {
                    if (response.data.success) {
                        const checkingAccount = this.accounts.find((acc) => acc.name === "checking");
                        checkingAccount.balance -= this.createAccountAmount;
                        this.accounts.push({
                            name: this.createAccountName,
                            type: "shared",
                            balance: this.createAccountAmount,
                            users: JSON.stringify([this.playerName]),
                        });
                        this.addStatement(this.accountNumber, "checking", "Initial deposit for " + this.createAccountName, this.createAccountAmount, "withdraw");
                        this.addStatement(this.accountNumber, this.createAccountName, "Initial deposit", this.createAccountAmount, "deposit");
                        this.createAccountName = "";
                        this.createAccountAmount = 0;
                        this.addNotification(response.data.message, "success");
                    } else {
                        this.createAccountName = "";
                        this.createAccountAmount = 0;
                        this.addNotification(response.data.message, "error");
                    }
                });
        },
        renameAccount() {
            if (!this.editAccount || !this.editAccountName) {
                return;
            }

            axios
                .post("https://qb-banking/renameAccount", {
                    oldName: this.editAccount.name,
                    newName: this.editAccountName,
                })
                .then((response) => {
                    if (response.data.success) {
                        const account = this.accounts.find((acc) => acc.name === this.editAccount.name);
                        if (account) {
                            account.name = this.editAccountName;
                        }
                        this.editAccount = null;
                        this.editAccountName = "";
                        this.addNotification(response.data.message, "success");
                    } else {
                        this.addNotification(response.data.message, "error");
                    }
                });
        },
        deleteAccount() {
            if (!this.editAccount) {
                return;
            }

            axios
                .post("https://qb-banking/deleteAccount", {
                    accountName: this.editAccount.name,
                })
                .then((response) => {
                    if (response.data.success) {
                        this.accounts = this.accounts.filter((acc) => acc.name !== this.editAccount.name);
                        this.editAccount = null;
                        this.addNotification(response.data.message, "success");
                    } else {
                        this.addNotification(response.data.message, "error");
                    }
                });
        },
        addUserToAccount() {
            if (!this.manageAccountName || !this.manageUserName) {
                return;
            }
            axios
                .post("https://qb-banking/addUser", {
                    accountName: this.manageAccountName.name,
                    userName: this.manageUserName,
                })
                .then((response) => {
                    if (response.data.success) {
                        let usersArray = JSON.parse(this.manageAccountName.users);
                        usersArray.push(this.manageUserName);
                        this.manageAccountName.users = JSON.stringify(usersArray);
                        this.manageUserName = "";
                        this.addNotification(response.data.message, "success");
                    } else {
                        this.addNotification(response.data.message, "error");
                    }
                });
        },
        removeUserFromAccount() {
            if (!this.manageAccountName || !this.manageUserName) {
                return;
            }

            axios
                .post("https://qb-banking/removeUser", {
                    accountName: this.manageAccountName.name,
                    userName: this.manageUserName,
                })
                .then((response) => {
                    if (response.data.success) {
                        let usersArray = JSON.parse(this.manageAccountName.users);
                        usersArray = usersArray.filter((user) => user !== this.manageUserName);
                        this.manageAccountName.users = JSON.stringify(usersArray);
                        this.manageUserName = "";
                        this.addNotification(response.data.message, "success");
                    } else {
                        this.addNotification(response.data.message, "error");
                    }
                });
        },
        addStatement(accountNumber, accountName, reason, amount, type) {
            let newStatement = {
                date: Date.now(),
                user: accountNumber,
                reason: reason,
                amount: amount,
                type: type,
            };

            if (!this.statements[accountName]) {
                this.statements[accountName] = [];
            }

            this.statements[accountName].push(newStatement);
        },
        addNotification(message, type) {
            this.notification = {
                message: message,
                type: type,
            };

            setTimeout(() => {
                this.notification = null;
            }, 3000);
        },
        appendNumber(number) {
            this.enteredPin += number.toString();
        },
        selectAccount(account) {
            this.selectedAccountStatement = account.name;
        },
        setTransferType(type) {
            this.transferType = type;
        },
        setActiveView(view) {
            this.activeView = view;
        },
        setLoanType(type) {
            this.loanType = type;
        },
        formatCurrency(amount) {
            return new Intl.NumberFormat().format(amount);
        },
        getTotalBalance() {
            if (!this.accounts || this.accounts.length === 0) return 0;
            return this.accounts.reduce((total, account) => total + account.balance, 0);
        },
        getSelectedAccountBalance() {
            if (!this.selectedAccountStatement || !this.accounts) return 0;
            const account = this.accounts.find(acc => acc.name === this.selectedAccountStatement);
            return account ? account.balance : 0;
        },
        formatDate(timestamp) {
            const date = new Date(timestamp);
            return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        },
        balanceClass(type) {
            return type === 'deposit' ? 'positive-balance' : 'negative-balance';
        },
        filterUsers() {
            if (!this.manageAccountName || typeof this.manageAccountName.users !== "string") {
                this.filteredUsers = [];
                return;
            }
            let usersArray;
            try {
                usersArray = JSON.parse(this.manageAccountName.users);
            } catch (e) {
                this.filteredUsers = [];
                return;
            }
            if (this.manageUserName === "") {
                this.filteredUsers = usersArray;
            } else {
                this.filteredUsers = usersArray.filter((user) => user.toLowerCase().includes(this.manageUserName.toLowerCase()));
            }
        },
        selectUser(user) {
            this.manageUserName = user;
            this.showUsersDropdown = false;
        },
        hideDropdown() {
            setTimeout(() => {
                this.showUsersDropdown = false;
            }, 100);
        },
        formatDate(timestamp) {
            const date = new Date(parseInt(timestamp));
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const day = date.getDate().toString().padStart(2, "0");
            const year = date.getFullYear();
            return `${month}/${day}/${year}`;
        },
        balanceClass(statementType) {
            return statementType === "deposit" ? "positive-balance" : "negative-balance";
        },
        
        // Loan methods removed
        
        // Police chief loan approval methods removed
        getLoanInterestRate() {
            // Different interest rates based on loan purpose and term
            const baseRates = {
                "vehicle": 5.5,
                "property": 4.2,
                "business": 6.0,
                "personal": 7.5
            };
            
            // Adjust based on term length
            let termAdjustment = 0;
            if (this.loanTerm <= 3) termAdjustment = -0.5;
            else if (this.loanTerm >= 24) termAdjustment = 1.0;
            
            return (baseRates[this.loanPurpose] + termAdjustment).toFixed(2);
        },
        calculateMonthlyPayment() {
            if (!this.loanAmount || !this.loanTerm) return 0;
            
            const principal = parseFloat(this.loanAmount);
            const interestRate = parseFloat(this.getLoanInterestRate()) / 100 / 12;
            const numberOfPayments = parseInt(this.loanTerm);
            
            // Monthly payment formula: P * (r(1+r)^n) / ((1+r)^n - 1)
            const monthlyPayment = principal * (interestRate * Math.pow(1 + interestRate, numberOfPayments)) / (Math.pow(1 + interestRate, numberOfPayments) - 1);
            
            return isNaN(monthlyPayment) ? 0 : monthlyPayment;
        },
        calculateTotalRepayment() {
            return this.calculateMonthlyPayment() * this.loanTerm;
        },
        applyForLoan() {
            if (!this.loanAmount || !this.loanTerm || !this.loanAccount) {
                this.addNotification(this.t("please_fill_all_details"), "error");
                return;
            }
            
            // Check if this is a police loan which requires approval
            if (this.loanPurpose === "police") {
                const pendingLoan = {
                    id: Date.now(),
                    applicant: this.playerName,
                    amount: this.loanAmount,
                    term: this.loanTerm,
                    purpose: this.loanPurpose,
                    reason: this.transferReason || this.t("police_loan"),
                    interestRate: this.getLoanInterestRate(),
                    monthlyPayment: this.calculateMonthlyPayment(),
                    accountName: this.loanAccount.name,
                    status: "pending"
                };
                
                // In a real implementation, this would be sent to the server
                // For demo purposes, we'll just add it to pendingLoans
                // This would normally be visible only to police chiefs
                this.addNotification(this.t("police_approval_required"), "info");
                
                // This would be a server call in a real implementation
                // For demo, we'll simulate adding it to a global pending loans list
                this.pendingLoans.push(pendingLoan);
                
                return;
            }
            
            // For regular loans, process immediately
            const newLoan = {
                id: Date.now(),
                amount: this.loanAmount,
                remainingAmount: this.loanAmount,
                term: this.loanTerm,
                purpose: this.loanPurpose,
                interestRate: this.getLoanInterestRate(),
                monthlyPayment: this.calculateMonthlyPayment(),
                nextPaymentDate: Date.now() + (30 * 24 * 60 * 60 * 1000), // 30 days from now
                accountName: this.loanAccount.name
            };
            
            this.activeLoans.push(newLoan);
            
            // Add the loan amount to the selected account
            const account = this.accounts.find(acc => acc.name === this.loanAccount.name);
            if (account) {
                account.balance += parseFloat(this.loanAmount);
                this.addStatement(this.accountNumber, account.name, `${this.t("loan")}: ${this.t(this.loanPurpose)}`, this.loanAmount, "deposit");
            }
            
            this.addNotification(`${this.t("loan_approved")}! $${this.formatCurrency(this.loanAmount)} ${this.t("has_been_deposited")}`, "success");
            
            // Reset loan form
            this.loanAmount = 0;
            this.loanAccount = null;
        },
        makeLoanPayment(loan) {
            // Find the account to make payment from
            const account = this.accounts.find(acc => acc.name === "checking");
            if (!account || account.balance < loan.monthlyPayment) {
                this.addNotification("Insufficient funds for loan payment", "error");
                return;
            }
            
            // Update account balance
            account.balance -= loan.monthlyPayment;
            
            // Update loan
            loan.remainingAmount -= (loan.monthlyPayment - (loan.monthlyPayment * (loan.interestRate / 100 / 12)));
            loan.nextPaymentDate = Date.now() + (30 * 24 * 60 * 60 * 1000); // 30 days from now
            
            // Add statement
            this.addStatement(this.accountNumber, account.name, `Loan payment: ${loan.purpose}`, loan.monthlyPayment, "withdraw");
            
            // Check if loan is paid off
            if (loan.remainingAmount <= 0) {
                this.activeLoans = this.activeLoans.filter(l => l.id !== loan.id);
                this.addNotification("Loan fully paid off!", "success");
            } else {
                this.addNotification(`Payment successful. Next payment due: ${this.formatDate(loan.nextPaymentDate)}`, "success");
            }
        },
        payOffLoan(loan) {
            // Find the account to make payment from
            const account = this.accounts.find(acc => acc.name === "checking");
            if (!account || account.balance < loan.remainingAmount) {
                this.addNotification("Insufficient funds to pay off loan", "error");
                return;
            }
            
            // Update account balance
            account.balance -= loan.remainingAmount;
            
            // Add statement
            this.addStatement(this.accountNumber, account.name, `Loan payoff: ${loan.purpose}`, loan.remainingAmount, "withdraw");
            
            // Remove loan
            this.activeLoans = this.activeLoans.filter(l => l.id !== loan.id);
            
            this.addNotification("Loan fully paid off!", "success");
        },
        
        // Analytics methods
        setAnalyticsTab(tab) {
            this.analyticsTab = tab;
        },
        updateAnalytics() {
            // This would normally fetch data for the selected period
            // For demo purposes, we'll just show a notification
            this.addNotification(`Analytics updated for ${this.analyticsPeriod}`, "success");
        },
        updateForecast() {
            // This would normally recalculate the forecast
            // For demo purposes, we'll just show a notification
            this.addNotification(`Forecast updated for next ${this.forecastPeriod} months`, "success");
        },
        getTotalIncome() {
            let total = 0;
            Object.keys(this.statements).forEach(accountName => {
                const accountStatements = this.statements[accountName] || [];
                accountStatements.forEach(statement => {
                    if (statement.type === "deposit") {
                        total += statement.amount;
                    }
                });
            });
            return total;
        },
        getTotalExpenses() {
            let total = 0;
            Object.keys(this.statements).forEach(accountName => {
                const accountStatements = this.statements[accountName] || [];
                accountStatements.forEach(statement => {
                    if (statement.type === "withdraw") {
                        total += statement.amount;
                    }
                });
            });
            return total;
        },
        getNetFlow() {
            return this.getTotalIncome() - this.getTotalExpenses();
        },
        getIncomePercentage() {
            const total = this.getTotalIncome() + this.getTotalExpenses();
            return total === 0 ? 50 : (this.getTotalIncome() / total) * 100;
        },
        getExpensesPercentage() {
            const total = this.getTotalIncome() + this.getTotalExpenses();
            return total === 0 ? 50 : (this.getTotalExpenses() / total) * 100;
        },
        getTransactionCategories() {
            // In a real implementation, this would categorize transactions based on keywords
            // For demo purposes, we'll return mock data
            return {
                "Income": this.getTotalIncome() * 0.8,
                "Shopping": this.getTotalExpenses() * 0.2,
                "Food": this.getTotalExpenses() * 0.15,
                "Transportation": this.getTotalExpenses() * 0.1,
                "Housing": this.getTotalExpenses() * 0.3,
                "Entertainment": this.getTotalExpenses() * 0.15,
                "Other": this.getTotalExpenses() * 0.1
            };
        },
        getCategoryPercentage(amount) {
            const totalExpenses = this.getTotalExpenses();
            return totalExpenses === 0 ? 0 : (amount / totalExpenses) * 100;
        },
        getCategoryIcon(category) {
            return this.categoryIcons[category] || "category";
        },
        getCategoryColor(category) {
            return this.categoryColors[category] || "#9e9e9e";
        },
        getIncomeChange() {
            // Mock data - would normally calculate from historical data
            return 5.2;
        },
        getExpenseChange() {
            // Mock data - would normally calculate from historical data
            return 3.7;
        },
        getSavingsRate() {
            const income = this.getTotalIncome();
            return income === 0 ? 0 : Math.round((this.getNetFlow() / income) * 100);
        },
        getFinancialHealthScore() {
            // Calculate a score based on savings rate, income stability, and expense ratio
            const savingsRate = this.getSavingsRate();
            const incomeStability = this.getIncomeStabilityScore();
            const expenseRatio = this.getTotalExpenses() / this.getTotalIncome();
            
            // Weight the factors
            let score = (savingsRate * 0.4) + (incomeStability * 0.3) + ((1 - expenseRatio) * 100 * 0.3);
            
            // Cap between 0 and 100
            return Math.min(100, Math.max(0, score));
        },
        getFinancialHealthStatus() {
            const score = this.getFinancialHealthScore();
            if (score >= 80) return "Excellent";
            if (score >= 60) return "Good";
            if (score >= 40) return "Fair";
            if (score >= 20) return "Needs Attention";
            return "Critical";
        },
        getHealthColor() {
            const score = this.getFinancialHealthScore();
            if (score >= 80) return "#4caf50"; // Green
            if (score >= 60) return "#8bc34a"; // Light Green
            if (score >= 40) return "#ffc107"; // Amber
            if (score >= 20) return "#ff9800"; // Orange
            return "#f44336"; // Red
        },
        getTransactionInsights() {
            // Mock insights - would normally be generated from transaction analysis
            return [
                {
                    id: 1,
                    icon: "trending_down",
                    title: "Spending Decreased",
                    description: "Your spending on Food decreased by 12% compared to last month."
                },
                {
                    id: 2,
                    icon: "repeat",
                    title: "Recurring Expenses",
                    description: "You have 5 recurring monthly expenses totaling $1,250."
                },
                {
                    id: 3,
                    icon: "savings",
                    title: "Savings Opportunity",
                    description: "Reducing your Entertainment expenses by 10% could save you $45 monthly."
                },
                {
                    id: 4,
                    icon: "warning",
                    title: "Unusual Activity",
                    description: "Large transaction of $850 on Shopping is 3x your monthly average."
                }
            ];
        },
        getTopExpenses() {
            // Mock data - would normally be calculated from actual transactions
            return [
                { id: 1, date: Date.now() - (2 * 24 * 60 * 60 * 1000), reason: "Rent Payment", amount: 1200 },
                { id: 2, date: Date.now() - (5 * 24 * 60 * 60 * 1000), reason: "Car Insurance", amount: 175 },
                { id: 3, date: Date.now() - (7 * 24 * 60 * 60 * 1000), reason: "Grocery Shopping", amount: 120 },
                { id: 4, date: Date.now() - (10 * 24 * 60 * 60 * 1000), reason: "Phone Bill", amount: 85 },
                { id: 5, date: Date.now() - (12 * 24 * 60 * 60 * 1000), reason: "Internet Service", amount: 75 }
            ];
        },
        getSpendingHeatmap() {
            // Generate mock data for a spending heatmap (30 days)
            const heatmap = [];
            const maxAmount = 200; // Maximum daily spending amount for scaling
            
            for (let i = 0; i < 30; i++) {
                // Generate random spending amount with some pattern
                let amount = Math.random() * maxAmount;
                
                // Make weekends higher
                const dayOfWeek = new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).getDay();
                if (dayOfWeek === 0 || dayOfWeek === 6) {
                    amount *= 1.5;
                }
                
                // Calculate intensity (0-1)
                const intensity = amount / maxAmount;
                
                heatmap.push({
                    date: this.formatDate(Date.now() - (i * 24 * 60 * 60 * 1000)),
                    amount: amount,
                    intensity: intensity
                });
            }
            
            return heatmap;
        },
        getHeatmapColor(intensity) {
            // Generate color from blue gradient based on intensity
            if (intensity < 0.25) return "#e0f7fa";
            if (intensity < 0.5) return "#4dd0e1";
            if (intensity < 0.75) return "#00acc1";
            return "#006064";
        },
        getHourlySpending() {
            // Mock data for hourly spending patterns
            return [
                { label: "6am", amount: 20 },
                { label: "9am", amount: 45 },
                { label: "12pm", amount: 120 },
                { label: "3pm", amount: 75 },
                { label: "6pm", amount: 150 },
                { label: "9pm", amount: 90 },
                { label: "12am", amount: 30 }
            ];
        },
        getHourHeight(amount) {
            // Calculate relative height for hour bars
            const maxAmount = Math.max(...this.getHourlySpending().map(h => h.amount));
            return (amount / maxAmount) * 100;
        },
        getDailySpending() {
            // Mock data for daily spending patterns
            return [
                { label: "Mon", amount: 120 },
                { label: "Tue", amount: 85 },
                { label: "Wed", amount: 95 },
                { label: "Thu", amount: 110 },
                { label: "Fri", amount: 180 },
                { label: "Sat", amount: 210 },
                { label: "Sun", amount: 150 }
            ];
        },
        getDayHeight(amount) {
            // Calculate relative height for day bars
            const maxAmount = Math.max(...this.getDailySpending().map(d => d.amount));
            return (amount / maxAmount) * 100;
        },
        getTopMerchants() {
            // Mock data for top merchants
            return [
                { name: "Grocery Store", amount: 350 },
                { name: "Gas Station", amount: 180 },
                { name: "Restaurant", amount: 150 },
                { name: "Online Shopping", amount: 120 },
                { name: "Coffee Shop", amount: 75 }
            ];
        },
        getMerchantPercentage(amount) {
            // Calculate percentage for merchant bars
            const totalSpent = this.getTopMerchants().reduce((sum, merchant) => sum + merchant.amount, 0);
            return (amount / totalSpent) * 100;
        },
        getIncomeSources() {
            // Mock data for income sources
            const totalIncome = this.getTotalIncome();
            return [
                { name: "Salary", icon: "work", amount: totalIncome * 0.75, percentage: 75 },
                { name: "Investments", icon: "trending_up", amount: totalIncome * 0.15, percentage: 15 },
                { name: "Side Business", icon: "store", amount: totalIncome * 0.08, percentage: 8 },
                { name: "Other", icon: "more_horiz", amount: totalIncome * 0.02, percentage: 2 }
            ];
        },
        getIncomeStabilityScore() {
            // Mock data - would normally calculate from income patterns
            return 85;
        },
        getRecurringIncome() {
            // Mock data - would normally identify recurring income
            return this.getTotalIncome() * 0.85;
        },
        getVariableIncome() {
            // Mock data - would normally identify variable income
            return this.getTotalIncome() * 0.15;
        },
        getIncomeFrequency() {
            // Mock data - would normally analyze income frequency
            return "Bi-weekly";
        },
        getIncomeChartYAxis() {
            // Generate Y-axis values for income chart
            const maxIncome = Math.max(...this.getMonthlyIncome().map(m => m.amount));
            const step = Math.ceil(maxIncome / 4 / 1000) * 1000;
            return [0, step, step * 2, step * 3, step * 4];
        },
        getMonthlyIncome() {
            // Mock data for monthly income
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
            return months.map((month, index) => ({
                label: month,
                amount: this.monthlyData.income[index]
            }));
        },
        getIncomeBarHeight(amount) {
            // Calculate relative height for income bars
            const maxValue = Math.max(...this.getIncomeChartYAxis());
            return (amount / maxValue) * 100;
        },
        getAverageMonthlyIncome() {
            // Calculate average monthly income
            const incomes = this.getMonthlyIncome().map(m => m.amount);
            return incomes.reduce((sum, amount) => sum + amount, 0) / incomes.length;
        },
        getIncomeGrowth() {
            // Mock data - would normally calculate year-over-year growth
            return 8.5;
        },
        getProjectedAnnualIncome() {
            // Project annual income based on current monthly average
            return this.getAverageMonthlyIncome() * 12;
        },
        getTrendChartYAxis() {
            // Generate Y-axis values for trend chart
            const allValues = [
                ...this.monthlyData.income,
                ...this.monthlyData.expenses,
                ...this.monthlyData.balance
            ];
            const maxValue = Math.max(...allValues);
            const step = Math.ceil(maxValue / 4 / 1000) * 1000;
            return [0, step, step * 2, step * 3, step * 4];
        },
        getMonthLabels() {
            // Return month labels for trend chart
            return ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
        },
        getIncomeTrendPoints() {
            // Generate SVG points for income trend line
            const maxValue = Math.max(...this.getTrendChartYAxis());
            const width = 1000;
            const height = 300;
            const monthCount = this.monthlyData.income.length;
            
            return this.monthlyData.income.map((value, index) => {
                const x = (index / (monthCount - 1)) * width;
                const y = height - ((value / maxValue) * height);
                return `${x},${y}`;
            }).join(" ");
        },
        getExpenseTrendPoints() {
            // Generate SVG points for expense trend line
            const maxValue = Math.max(...this.getTrendChartYAxis());
            const width = 1000;
            const height = 300;
            const monthCount = this.monthlyData.expenses.length;
            
            return this.monthlyData.expenses.map((value, index) => {
                const x = (index / (monthCount - 1)) * width;
                const y = height - ((value / maxValue) * height);
                return `${x},${y}`;
            }).join(" ");
        },
        getBalanceTrendPoints() {
            // Generate SVG points for balance trend line
            const maxValue = Math.max(...this.getTrendChartYAxis());
            const width = 1000;
            const height = 300;
            const monthCount = this.monthlyData.balance.length;
            
            return this.monthlyData.balance.map((value, index) => {
                const x = (index / (monthCount - 1)) * width;
                const y = height - ((value / maxValue) * height);
                return `${x},${y}`;
            }).join(" ");
        },
        getCategoryTrends() {
            // Mock data for category trends
            return [
                { name: "Food", change: 5.2, values: [280, 310, 290, 320, 350, 330] },
                { name: "Transportation", change: -3.8, values: [150, 140, 160, 130, 140, 145] },
                { name: "Housing", change: 0.5, values: [1200, 1200, 1200, 1200, 1250, 1250] },
                { name: "Entertainment", change: 12.4, values: [180, 200, 220, 190, 240, 260] }
            ];
        },
        getSparklineHeight(value, values) {
            // Calculate relative height for sparkline bars
            const maxValue = Math.max(...values);
            return (value / maxValue) * 100;
        },
        getAnomalies() {
            // Mock data for anomaly detection
            return [
                {
                    id: 1,
                    icon: "warning",
                    title: "Unusual Expense",
                    description: "Large transaction at Electronics Store",
                    date: Date.now() - (3 * 24 * 60 * 60 * 1000),
                    amount: 899,
                    type: "expense"
                },
                {
                    id: 2,
                    icon: "repeat",
                    title: "Duplicate Transaction",
                    description: "Same amount charged twice by Streaming Service",
                    date: Date.now() - (7 * 24 * 60 * 60 * 1000),
                    amount: 14.99,
                    type: "expense"
                }
            ];
        },
        getForecastYAxis() {
            // Generate Y-axis values for forecast chart
            const forecastData = this.getForecastData();
            const maxValue = Math.max(...forecastData);
            const minValue = Math.min(...forecastData);
            const range = maxValue - minValue;
            const step = Math.ceil(range / 4 / 1000) * 1000;
            
            // Create array with 5 steps from min to max
            const baseValue = Math.floor(minValue / 1000) * 1000;
            return [baseValue, baseValue + step, baseValue + (step * 2), baseValue + (step * 3), baseValue + (step * 4)];
        },
        getForecastData() {
            // Mock data for forecast
            // Start with current balance and project forward
            const startBalance = this.getTotalBalance();
            const monthlyNet = this.getNetFlow();
            const forecastData = [];
            
            // Add current month
            forecastData.push(startBalance);
            
            // Add forecast months with some variability
            for (let i = 1; i <= this.forecastPeriod; i++) {
                // Add some randomness to the monthly net flow
                const variability = 0.2; // 20% variability
                const randomFactor = 1 + ((Math.random() * variability * 2) - variability);
                const monthNet = monthlyNet * randomFactor;
                
                // Add to previous balance
                const newBalance = forecastData[i-1] + monthNet;
                forecastData.push(newBalance);
            }
            
            return forecastData;
        },
        getForecastMonths() {
            // Generate month labels for forecast
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const currentMonth = new Date().getMonth();
            
            // Start with current month
            const labels = [months[currentMonth]];
            
            // Add future months
            for (let i = 1; i <= this.forecastPeriod; i++) {
                const monthIndex = (currentMonth + i) % 12;
                labels.push(months[monthIndex]);
            }
            
            return labels;
        },
        getForecastMarkers() {
            // Generate markers for forecast chart
            const forecastData = this.getForecastData();
            const months = this.getForecastMonths();
            
            return forecastData.map((value, index) => ({
                month: months[index],
                value: value
            }));
        },
        getMarkerPosition(value) {
            // Calculate vertical position for forecast markers
            const yAxis = this.getForecastYAxis();
            const minValue = yAxis[0];
            const maxValue = yAxis[yAxis.length - 1];
            const range = maxValue - minValue;
            
            return ((value - minValue) / range) * 100;
        },
        getForecastPath() {
            // Generate SVG path for forecast line
            const forecastData = this.getForecastData();
            const yAxis = this.getForecastYAxis();
            const minValue = yAxis[0];
            const maxValue = yAxis[yAxis.length - 1];
            const range = maxValue - minValue;
            
            const width = 1000;
            const height = 300;
            const pointCount = forecastData.length;
            
            const points = forecastData.map((value, index) => {
                const x = (index / (pointCount - 1)) * width;
                const y = height - (((value - minValue) / range) * height);
                return `${x},${y}`;
            }).join(" ");
            
            return `M ${points}`;
        },
        getForecastAreaPath() {
            // Generate SVG path for forecast area (filled region under the line)
            const forecastData = this.getForecastData();
            const yAxis = this.getForecastYAxis();
            const minValue = yAxis[0];
            const maxValue = yAxis[yAxis.length - 1];
            const range = maxValue - minValue;
            
            const width = 1000;
            const height = 300;
            const pointCount = forecastData.length;
            
            // Generate points for the line
            const linePoints = forecastData.map((value, index) => {
                const x = (index / (pointCount - 1)) * width;
                const y = height - (((value - minValue) / range) * height);
                return `${x},${y}`;
            });
            
            // Create path that goes down to bottom and back to start
            return `M ${linePoints.join(" L ")} L ${width},${height} L 0,${height} Z`;
        },
        getForecastInsights() {
            // Mock insights for forecast
            return [
                {
                    id: 1,
                    icon: "trending_up",
                    title: "Positive Trend",
                    description: `Your balance is projected to increase by $${this.formatCurrency(this.getProjectedSavings())} over the next ${this.forecastPeriod} months.`
                },
                {
                    id: 2,
                    icon: "event",
                    title: "Upcoming Expenses",
                    description: "You have 3 large recurring expenses coming up in the next 2 months."
                },
                {
                    id: 3,
                    icon: "savings",
                    title: "Savings Goal Impact",
                    description: "At your current rate, you'll reach your 'New Car' goal 2 months ahead of schedule."
                }
            ];
        },
        getProjectedSavings() {
            // Calculate projected savings over forecast period
            const forecastData = this.getForecastData();
            return forecastData[forecastData.length - 1] - forecastData[0];
        },
        getGoalProjections() {
            // Mock data for goal projections
            if (this.savingsGoals.length === 0) {
                return [];
            }
            
            return this.savingsGoals.map(goal => {
                // Calculate months until target date
                const now = Date.now();
                const monthsRemaining = Math.max(1, Math.round((goal.targetDate - now) / (30 * 24 * 60 * 60 * 1000)));
                
                // Calculate current progress percentage
                const currentProgress = this.getGoalProgress(goal);
                
                // Calculate projected progress
                const monthlyContribution = 100; // Mock monthly contribution
                const additionalProgress = Math.min(
                    100 - currentProgress,
                    (monthlyContribution * this.forecastPeriod * 100) / goal.targetAmount
                );
                const projectedProgress = Math.min(100, currentProgress + additionalProgress);
                
                return {
                    id: goal.id,
                    name: goal.name,
                    timeline: `${monthsRemaining} months remaining`,
                    progress: currentProgress,
                    projectedProgress: projectedProgress
                };
            });
        },
        
        // Savings Goals methods
        createSavingsGoal() {
            if (!this.goalName || !this.goalAmount || !this.goalDate || !this.goalAccount) {
                this.addNotification("Please fill in all goal details", "error");
                return;
            }
            
            const newGoal = {
                id: Date.now(),
                name: this.goalName,
                targetAmount: parseFloat(this.goalAmount),
                currentAmount: 0,
                targetDate: new Date(this.goalDate).getTime(),
                accountName: this.goalAccount.name
            };
            
            this.savingsGoals.push(newGoal);
            this.addNotification(`Savings goal "${this.goalName}" created!`, "success");
            
            // Reset form
            this.goalName = "";
            this.goalAmount = 0;
            this.goalDate = "";
            this.goalAccount = null;
        },
        getGoalProgress(goal) {
            return goal.targetAmount === 0 ? 0 : Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
        },
        contributeToGoal(goal) {
            // In a real implementation, this would open a contribution form
            // For demo purposes, we'll add a fixed amount
            const contributionAmount = 100;
            
            const account = this.accounts.find(acc => acc.name === goal.accountName);
            if (!account || account.balance < contributionAmount) {
                this.addNotification("Insufficient funds for contribution", "error");
                return;
            }
            
            // Update goal
            goal.currentAmount += contributionAmount;
            
            // Update account
            account.balance -= contributionAmount;
            
            // Add statement
            this.addStatement(this.accountNumber, account.name, `Contribution to ${goal.name} goal`, contributionAmount, "withdraw");
            
            // Check if goal is reached
            if (goal.currentAmount >= goal.targetAmount) {
                this.addNotification(`Congratulations! You've reached your "${goal.name}" savings goal!`, "success");
            } else {
                this.addNotification(`$${this.formatCurrency(contributionAmount)} contributed to "${goal.name}" goal!`, "success");
            }
        },
        deleteGoal(goal) {
            this.savingsGoals = this.savingsGoals.filter(g => g.id !== goal.id);
            this.addNotification(`Savings goal "${goal.name}" deleted`, "success");
        },
        
        // Scheduled Transfers methods
        scheduleTransfer() {
            if (!this.scheduledFromAccount || !this.scheduledAmount || !this.scheduledDate || !this.scheduledReason) {
                this.addNotification("Please fill in all transfer details", "error");
                return;
            }
            
            if (this.scheduledTransferType === "internal" && !this.scheduledToAccount) {
                this.addNotification("Please select a destination account", "error");
                return;
            }
            
            if (this.scheduledTransferType === "external" && !this.scheduledToNumber) {
                this.addNotification("Please enter a destination account number", "error");
                return;
            }
            
            const newTransfer = {
                id: Date.now(),
                fromAccount: this.scheduledFromAccount.name,
                toAccount: this.scheduledTransferType === "internal" ? this.scheduledToAccount.name : null,
                toNumber: this.scheduledTransferType === "external" ? this.scheduledToNumber : null,
                amount: parseFloat(this.scheduledAmount),
                reason: this.scheduledReason,
                frequency: this.scheduledFrequency,
                nextDate: new Date(this.scheduledDate).getTime()
            };
            
            this.scheduledTransfers.push(newTransfer);
            this.addNotification(`Transfer scheduled for ${this.formatDate(newTransfer.nextDate)}`, "success");
            
            // Reset form
            this.scheduledAmount = 0;
            this.scheduledReason = "";
            this.scheduledDate = "";
            this.scheduledToAccount = null;
            this.scheduledToNumber = "";
        },
        formatFrequency(frequency) {
            const formats = {
                "once": "One-time",
                "weekly": "Weekly",
                "biweekly": "Bi-weekly",
                "monthly": "Monthly"
            };
            return formats[frequency] || frequency;
        },
        cancelScheduledTransfer(transfer) {
            this.scheduledTransfers = this.scheduledTransfers.filter(t => t.id !== transfer.id);
            this.addNotification("Scheduled transfer canceled", "success");
        },
        
        // Quick Pay methods
        saveNewContact() {
            if (!this.newContactName || !this.newContactAccount) {
                this.addNotification("Please fill in all contact details", "error");
                return;
            }
            
            const newContact = {
                id: Date.now(),
                name: this.newContactName,
                accountNumber: this.newContactAccount
            };
            
            this.savedContacts.push(newContact);
            this.addNotification(`Contact "${this.newContactName}" saved!`, "success");
            
            // Reset form and hide it
            this.newContactName = "";
            this.newContactAccount = "";
            this.showAddContactForm = false;
        },
        cancelAddContact() {
            this.newContactName = "";
            this.newContactAccount = "";
            this.showAddContactForm = false;
        },
        selectQuickPayContact(contact) {
            this.selectedContact = contact;
            this.quickPayFromAccount = this.accounts.find(acc => acc.name === "checking") || null;
        },
        cancelQuickPay() {
            this.selectedContact = null;
            this.quickPayAmount = 0;
            this.quickPayReason = "";
            this.quickPayFromAccount = null;
        },
        sendQuickPay() {
            if (!this.quickPayFromAccount || !this.quickPayAmount || !this.selectedContact) {
                this.addNotification("Please fill in all payment details", "error");
                return;
            }
            
            // This would normally make a server request
            // For demo purposes, we'll just update locally
            
            // Update account
            const account = this.accounts.find(acc => acc.name === this.quickPayFromAccount.name);
            if (!account || account.balance < this.quickPayAmount) {
                this.addNotification("Insufficient funds for payment", "error");
                return;
            }
            
            account.balance -= parseFloat(this.quickPayAmount);
            
            // Add statement
            this.addStatement(
                this.accountNumber, 
                account.name, 
                this.quickPayReason || `Payment to ${this.selectedContact.name}`, 
                this.quickPayAmount, 
                "withdraw"
            );
            
            this.addNotification(`$${this.formatCurrency(this.quickPayAmount)} sent to ${this.selectedContact.name}!`, "success");
            
            // Reset form
            this.cancelQuickPay();
        },
        // Translation method
        t(key) {
            return this.translations[key] || key;
        },
        
        handleMessage(event) {
            const action = event.data.action;
            if (action === "openBank") {
                this.openBank(event.data);
            } else if (action === "openATM") {
                this.tempBankData = event.data;
                this.showPinPrompt = true;
            }
        },
        handleKeydown(event) {
            if (event.key === "Escape") {
                this.closeApplication();
            }
        },
        closeApplication() {
            if (this.isBankOpen) {
                this.isBankOpen = false;
            } else if (this.isATMOpen) {
                this.isATMOpen = false;
            } else if (this.showPinPrompt) {
                this.showPinPrompt = false;
                this.enteredPin = "";
                this.acceptablePins = [];
                this.tempBankData = null;
            }
            axios.post(`https://${GetParentResourceName()}/closeApp`, {});
        },
    },
    mounted() {
        document.addEventListener("keydown", this.handleKeydown);
        window.addEventListener("message", this.handleMessage);
    },
    beforeUnmount() {
        document.removeEventListener("keydown", this.handleKeydown);
    },
}).mount("#app");
