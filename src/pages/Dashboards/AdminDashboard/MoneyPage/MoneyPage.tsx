import React, { useState, useMemo, useEffect } from 'react';
import './MoneyPage.css';
import {useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../redux/store';
import { image_base, type Transaction } from '../../../../data/generalTypes';
import { fetchTransactions } from '../../../../redux/slices/FinincialSlice';


const TransactionsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('الكل');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const transactionsPerPage = 10;

  // fetch transactions from store.
  const {transactions} = useSelector((state : RootState)=>state.transations);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  useEffect(()=>{
    if(transactions.length == 0){
      dispatch(fetchTransactions());
    }
  },[])
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch = searchTerm.toLowerCase() === '' ||
        transaction.patient.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.doctor.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.id.toString().includes(searchTerm);

      const matchesStatus = filterStatus === 'الكل' || transaction.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, filterStatus]);

  // منطق التنقل بين الصفحات
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const openDetailsModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };

  const closeDetailsModal = () => {
    setSelectedTransaction(null);
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case ' مدفوع':
        return 'status-success';
      case 'غير مدفوع':
        return 'status-pending';
      default:
        return '';
    }
  };

  return (
    <div className="transactions-page">
      <header className="page-header">
        <h1>سجل المعاملات المالية</h1>
        <div className="filter-controls">
          <input
            type="text"
            placeholder="بحث (الاسم أو الرقم)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="status-filter"
          >
            <option value="الكل">جميع الحالات</option>
            <option value=" مدفوع">نجحت</option>
            <option value="غير مدفوع">قيد الانتظار</option>
          </select>
        </div>
      </header>

      <div className="table-container">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>المريض</th>
              <th>الطبيب</th>
              <th>المبلغ</th>
              <th>الحالة</th>
              <th>تاريخ الحجز</th>
              <th>آخر تحديث</th>
              <th>التفاصيل</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.length > 0 ? (
              currentTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>
                    <div className="user-info">
                      <img src={`${image_base}/${transaction.patient.avatar}`} alt="صورة المريض" className="avatar" />
                      <span>{transaction.patient.first_name} {transaction.patient.last_name}</span>
                    </div>
                  </td>
                  <td>
                    <div className="user-info">
                      <img src={`${image_base}/${transaction.doctor.avatar}`} alt="صورة الطبيب" className="avatar" />
                      <div>
                        <span>{transaction.doctor.first_name} {transaction.doctor.last_name}</span>
                        <span className="user-specialization">{transaction.doctor.specialization}</span>
                      </div>
                    </div>
                  </td>
                  <td>${transaction.amount.toFixed(2)}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td>{transaction.reservation_date}</td>
                  <td>{new Date(transaction.updated_at).toLocaleString('ar-EG')}</td>
                  <td>
                    <button className="details-btn" onClick={() => openDetailsModal(transaction)}>
                      عرض
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="no-data-msg">
                  لا توجد معاملات متاحة.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            السابق
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            التالي
          </button>
        </div>
      )}

      {selectedTransaction && (
        <div className="modal-overlay" onClick={closeDetailsModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>تفاصيل المعاملة</h2>
              <button className="close-btn" onClick={closeDetailsModal}>&times;</button>
            </div>
            <div className="modal-body">
              <p><strong>الرقم التعريفي:</strong> {selectedTransaction.id}</p>
              <p><strong>المبلغ:</strong> ${selectedTransaction.amount.toFixed(2)}</p>
              <p><strong>حالة المعاملة:</strong> {selectedTransaction.status}</p>
              <p><strong>رقم البطاقة:</strong> {selectedTransaction.card_number.replace(selectedTransaction.card_number.slice(0,8),'*** *** ** ')}</p>
              <p><strong>تاريخ الحجز:</strong> {selectedTransaction.reservation_date}</p>
              <p><strong>الطبيب:</strong> {selectedTransaction.doctor.first_name} {selectedTransaction.doctor.last_name}</p>
              <p><strong>المريض:</strong> {selectedTransaction.patient.first_name} {selectedTransaction.patient.last_name}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionsPage;