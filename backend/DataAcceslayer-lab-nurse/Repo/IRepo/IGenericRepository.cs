using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace DataAcceslayer_lab_nurse.Repo.IRepo
{
    public interface IGenericRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T?> GetByIdAsync(Guid id);
        Task AddAsync(T entity);
        void Update(T entity);
        void Delete(T entity);
        Task<bool> CheckIfExist(Expression<Func<T, bool>> predicate);
        Task<T?> GetByExpression(Expression<Func<T, bool>> Exp);
        Task BeginTransactionAsync();
        Task RollbackAsync();
        Task CommitAsync();
        Task SaveChangesAsync();
    }
}
