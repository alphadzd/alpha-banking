local Translations = {
    success = {
        withdraw = 'تم السحب بنجاح',
        deposit = 'تم الإيداع بنجاح',
        transfer = 'تم التحويل بنجاح',
        account = 'تم إنشاء الحساب',
        rename = 'تم تغيير اسم الحساب',
        delete = 'تم حذف الحساب',
        userAdd = 'تم إضافة المستخدم',
        userRemove = 'تم إزالة المستخدم',
        card = 'تم إنشاء البطاقة',
        give = 'تم إعطاء $%s نقداً',
        receive = 'تم استلام $%s نقداً',
    },
    error = {
        error = 'حدث خطأ',
        access = 'غير مصرح',
        account = 'الحساب غير موجود',
        accounts = 'تم إنشاء الحد الأقصى من الحسابات',
        user = 'المستخدم مضاف مسبقاً',
        noUser = 'المستخدم غير موجود',
        money = 'لا يوجد مال كافٍ',
        pin = 'رمز PIN غير صالح',
        card = 'لا توجد بطاقة بنكية',
        amount = 'قيمة غير صالحة',
        toofar = 'أنت بعيد جداً',
    },
    progress = {
        atm = 'جاري الوصول إلى الصراف الآلي',
    }
}


Lang = Lang or Locale:new({
    phrases = Translations,
    warnOnMissing = true
})
