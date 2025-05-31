local Translations = {
    success = {
        withdraw = 'تم السحب بنجاح',
        deposit = 'تم الإيداع بنجاح',
        transfer = 'تم التحويل بنجاح',
        account = 'تم إنشاء الحساب',
        rename = 'تم إعادة تسمية الحساب',
        delete = 'تم حذف الحساب',
        userAdd = 'تمت إضافة المستخدم',
        userRemove = 'تمت إزالة المستخدم',
        card = 'تم إنشاء البطاقة',
        give = 'تم إعطاء $%s نقدًا',
        receive = 'تم استلام $%s نقدًا',
    },
    error = {
        error = 'حدث خطأ',
        access = 'غير مصرح',
        account = 'لم يتم العثور على الحساب',
        accounts = 'تم إنشاء الحد الأقصى من الحسابات',
        user = 'المستخدم مضاف بالفعل',
        noUser = 'لم يتم العثور على المستخدم',
        money = 'لا يوجد مال كافي',
        pin = 'رقم التعريف الشخصي غير صالح',
        card = 'لم يتم العثور على بطاقة مصرفية',
        amount = 'المبلغ غير صالح',
        toofar = 'أنت بعيد جدًا',
    },
    progress = {
        atm = 'الوصول إلى الصراف الآلي',
    }
}

Lang = Lang or Locale:new({
    phrases = Translations,
    warnOnMissing = true
})