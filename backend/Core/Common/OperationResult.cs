using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Common
{
    public class OperationResult
    {
        public bool Succeeded { get; set; }

        public List<string> Errors { get; set; } = new();

        public static OperationResult Success()
        {
            return new OperationResult
            {
                Succeeded = true
            };
        }

        public static OperationResult Failure(params string[] errors)
        {
            return new OperationResult
            {
                Succeeded = false,
                Errors = errors.ToList()
            };
        }

        public static OperationResult Failure(IEnumerable<string> errors)
        {
            return new OperationResult
            {
                Succeeded = false,
                Errors = errors.ToList()
            };
        }
    }

    public class OperationResult<T> : OperationResult
    {
        public T Data { get; private set; }

        public static OperationResult<T> Success(T data)
        {
            return new OperationResult<T>
            {
                Succeeded = true,
                Data = data
            };
        }

        public static OperationResult<IEnumerable<T>> Success(IEnumerable<T>  data)
        {
            return new OperationResult<IEnumerable<T>>
            {
                Succeeded = true,
                Data = data.ToList()
            };
        }

        public new static OperationResult<T> Failure(params string[] errors)
        {
            return new OperationResult<T>
            {
                Succeeded = false,
                Errors = errors.ToList()
            };
        }

        public new static OperationResult<T> Failure(IEnumerable<string> errors)
        {
            return new OperationResult<T>
            {
                Succeeded = false,
                Errors = errors.ToList()
            };
        }

        public new static OperationResult<string> Success(string data)
        {
            return new OperationResult<string>
            {
                Succeeded = true,
                Data = data
            };
        }
    }
}
