SELECT e.dept_id, count(*), sum(e.salary)  FROM department as d
INNER JOIN employee as e
ON d.dept_id = e.dept_id
GROUP BY e.dept_id
ORDER BY e.dept_id;
