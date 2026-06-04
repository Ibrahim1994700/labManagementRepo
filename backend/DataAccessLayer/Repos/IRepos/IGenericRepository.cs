using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Repos.IRepos
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
