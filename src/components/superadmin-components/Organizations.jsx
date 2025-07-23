import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  BookOpen, 
  Calendar, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  TrendingUp,
  Mail,
  Phone
} from 'lucide-react';

const Organizations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Mock organizations data
  const organizations = [
    {
      id: '1',
      name: 'TechCorp Academy',
      description: 'Leading technology training institute',
      logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      adminName: 'John Smith',
      adminEmail: 'john@techcorp.com',
      adminPhone: '+1 (555) 123-4567',
      totalUsers: 245,
      totalInstructors: 12,
      totalStudents: 233,
      totalCourses: 18,
      activeSubscription: true,
      subscriptionPlan: 'Enterprise',
      createdAt: '2023-01-15',
      lastActivity: '2024-01-14',
      status: 'active',
      monthlyRevenue: 12500,
      completionRate: 87
    },
    {
      id: '2',
      name: 'EduMaster Institute',
      description: 'Comprehensive educational solutions',
      logo: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      adminName: 'Sarah Johnson',
      adminEmail: 'sarah@edumaster.com',
      adminPhone: '+1 (555) 234-5678',
      totalUsers: 189,
      totalInstructors: 8,
      totalStudents: 181,
      totalCourses: 14,
      activeSubscription: true,
      subscriptionPlan: 'Professional',
      createdAt: '2023-03-22',
      lastActivity: '2024-01-13',
      status: 'active',
      monthlyRevenue: 8900,
      completionRate: 92
    },
    {
      id: '3',
      name: 'SkillBuilder Pro',
      description: 'Professional skill development platform',
      logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      adminName: 'Mike Wilson',
      adminEmail: 'mike@skillbuilder.com',
      adminPhone: '+1 (555) 345-6789',
      totalUsers: 156,
      totalInstructors: 6,
      totalStudents: 150,
      totalCourses: 12,
      activeSubscription: false,
      subscriptionPlan: 'Basic',
      createdAt: '2023-06-10',
      lastActivity: '2024-01-10',
      status: 'suspended',
      monthlyRevenue: 0,
      completionRate: 78
    },
    {
      id: '4',
      name: 'LearnHub Solutions',
      description: 'Corporate training and development',
      logo: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      adminName: 'Emma Davis',
      adminEmail: 'emma@learnhub.com',
      adminPhone: '+1 (555) 456-7890',
      totalUsers: 312,
      totalInstructors: 15,
      totalStudents: 297,
      totalCourses: 22,
      activeSubscription: true,
      subscriptionPlan: 'Enterprise',
      createdAt: '2023-02-08',
      lastActivity: '2024-01-14',
      status: 'active',
      monthlyRevenue: 15600,
      completionRate: 85
    },
    {
      id: '5',
      name: 'Digital Learning Co',
      description: 'Modern digital education platform',
      logo: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      adminName: 'David Brown',
      adminEmail: 'david@digitallearning.com',
      adminPhone: '+1 (555) 567-8901',
      totalUsers: 98,
      totalInstructors: 4,
      totalStudents: 94,
      totalCourses: 8,
      activeSubscription: true,
      subscriptionPlan: 'Basic',
      createdAt: '2023-09-15',
      lastActivity: '2024-01-12',
      status: 'active',
      monthlyRevenue: 2400,
      completionRate: 89
    }
  ];

  // Filter and sort organizations
  const filteredOrganizations = organizations
    .filter(org => {
      const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           org.adminName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           org.adminEmail.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || org.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'users':
          return b.totalUsers - a.totalUsers;
        case 'revenue':
          return b.monthlyRevenue - a.monthlyRevenue;
        case 'created':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </span>
        );
      case 'suspended':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Suspended
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Inactive
          </span>
        );
    }
  };

  const getPlanBadge = (plan) => {
    const colors = {
      'Basic': 'bg-blue-100 text-blue-800',
      'Professional': 'bg-purple-100 text-purple-800',
      'Enterprise': 'bg-yellow-100 text-yellow-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[plan] || 'bg-gray-100 text-gray-800'}`}>
        {plan}
      </span>
    );
  };

  const totalStats = {
    totalOrgs: organizations.length,
    activeOrgs: organizations.filter(org => org.status === 'active').length,
    totalUsers: organizations.reduce((sum, org) => sum + org.totalUsers, 0),
    totalRevenue: organizations.reduce((sum, org) => sum + org.monthlyRevenue, 0)
  };

  return (
    <div className="space-y-6 bg-gray-300 p-7">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-600 mt-2">Manage all organizations using your LMS platform</p>
        </div>
        <button className="cursor-pointer flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
          <Plus className="w-4 h-4" />
          <span>Add Organization</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Organizations</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalStats.totalOrgs}</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg">
              <Building2 className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Organizations</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalStats.activeOrgs}</p>
            </div>
            <div className="bg-green-500 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalStats.totalUsers.toLocaleString()}</p>
            </div>
            <div className="bg-purple-500 p-3 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">${totalStats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-yellow-500 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search organizations, admins, or emails..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="name">Sort by Name</option>
            <option value="users">Sort by Users</option>
            <option value="revenue">Sort by Revenue</option>
            <option value="created">Sort by Created Date</option>
          </select>
        </div>
      </div>

      {/* Organizations List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Organization
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Admin
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Users
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Courses
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrganizations.map((org) => (
                <tr key={org.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <img
                        src={org.logo}
                        alt={org.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{org.name}</div>
                        <div className="text-sm text-gray-500">{org.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{org.adminName}</div>
                      <div className="text-sm text-gray-500 flex items-center space-x-1">
                        <Mail className="w-3 h-3" />
                        <span>{org.adminEmail}</span>
                      </div>
                      <div className="text-sm text-gray-500 flex items-center space-x-1">
                        <Phone className="w-3 h-3" />
                        <span>{org.adminPhone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center space-x-1 mb-1">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{org.totalUsers}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {org.totalInstructors} instructors, {org.totalStudents} students
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">{org.totalCourses}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getPlanBadge(org.subscriptionPlan)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${org.monthlyRevenue.toLocaleString()}/mo
                    </div>
                    <div className="text-xs text-gray-500">
                      {org.completionRate}% completion
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(org.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600 transition-colors duration-200">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrganizations.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No organizations found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Organizations;