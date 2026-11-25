
import { ArrowUpRight } from "lucide-react";

function StatCard({ title, value, icon: Icon, color, period }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <div className={`stat-icon ${color}`}>
          <Icon size={23} />
        </div>

        <span className="stat-trend">
          <ArrowUpRight size={15} />
        </span>
      </div>

      <p>{title}</p>

      <h2>{value}</h2>

      <span className="stat-description">
        {period}
      </span>
    </div>
  );
}

export default StatCard;
