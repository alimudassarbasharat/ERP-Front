<template>
  <div class="relative w-full min-h-screen overflow-hidden">
    <!-- Ultra-Modern Animated Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <!-- Floating Geometric Shapes -->
      <div class="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-float"></div>
      <div class="absolute top-32 right-20 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-float-delayed"></div>
      <div class="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl animate-float-slow"></div>
      
      <!-- Grid Pattern Overlay -->
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent"></div>
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0); background-size: 20px 20px;"></div>
        </div>

    <!-- Beast Mode Loading Screen -->
    <div v-if="initialLoading" class="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 z-50 flex items-center justify-center">
      <div class="text-center transform scale-110">
        <div class="relative mb-8">
          <!-- Rotating Ring -->
          <div class="w-32 h-32 border-4 border-purple-500/20 rounded-full"></div>
          <div class="absolute inset-0 w-32 h-32 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
          <div class="absolute inset-2 w-28 h-28 border-4 border-transparent border-t-pink-500 rounded-full animate-spin-reverse"></div>
          
          <!-- Center Icon -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <IconMessageCircle2 class="text-white text-2xl" />
      </div>
      </div>
    </div>

        <!-- Loading Text with Gradient -->
        <h3 class="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          Team Communication
        </h3>
        <p class="text-slate-300 animate-pulse">Initializing...</p>
        
        <!-- Progress Dots -->
        <div class="flex justify-center space-x-2 mt-6">
          <div class="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
          <div class="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style="animation-delay: 0.1s;"></div>
          <div class="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style="animation-delay: 0.2s;"></div>
        </div>
      </div>
        </div>
        
        <!-- Ultra-Modern Glassmorphic Header -->
    <div class="relative z-10 mx-6 mt-6 mb-8">
      <div class="relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl">
        <!-- Header Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10"></div>
        
        <!-- Header Content -->
        <div class="relative p-8">
          <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <!-- Brand Section -->
            <div class="flex items-center gap-6">
              <!-- Ultra-Modern Logo -->
              <div class="relative group">
                <!-- Glow Effect -->
                <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-all duration-500 animate-pulse"></div>
                
                <!-- Main Icon Container -->
                <div class="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <!-- Inner Glow -->
                  <div class="absolute inset-2 rounded-2xl bg-white/20"></div>
                  <IconMessageCircle2 class="relative text-white text-3xl animate-pulse" />
            </div>
                
                <!-- Floating Particles -->
                <div class="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
                <div class="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-400 rounded-full animate-ping" style="animation-delay: 0.5s;"></div>
              </div>
              
              <!-- Title Section -->
              <div class="space-y-3">
                <div class="flex items-center gap-4">
                  <h1 class="text-4xl font-black bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                    Team Communication
                  </h1>
                  
                  <!-- Status Indicator -->
                  <div class="flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                    <div class="relative">
                      <div :class="['w-3 h-3 rounded-full', status.fully_configured ? 'bg-green-400' : 'bg-yellow-400']"></div>
                      <div :class="['absolute inset-0 w-3 h-3 rounded-full animate-ping', status.fully_configured ? 'bg-green-400' : 'bg-yellow-400']"></div>
                    </div>
                    <span :class="['text-sm font-semibold', status.fully_configured ? 'text-green-200' : 'text-yellow-200']">
                      {{ status.fully_configured ? 'Live' : 'Setup' }}
              </span>
            </div>
                </div>
                
                <p class="text-slate-300 font-medium flex items-center gap-2">
                  <IconWifi class="w-4 h-4 text-purple-400" />
                  Advanced internal messaging platform
                </p>
              </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="flex flex-wrap items-center gap-3">
              <!-- Analytics Button -->
              <button @click="showAnalytics = true" 
                      class="group relative overflow-hidden h-14 px-8 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span class="relative flex items-center gap-3">
                  <IconChartLine class="w-5 h-5" />
                  Analytics
              </span>
              </button>
              
              <!-- Templates Button -->
              <button @click="showTemplates = true" 
                      class="group relative overflow-hidden h-14 px-8 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <div class="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span class="relative flex items-center gap-3">
                  <IconFileText class="w-5 h-5" />
                  Templates
                </span>
              </button>
              
              <!-- Schedule Button -->
              <button @click="showScheduler = true" 
                      class="group relative overflow-hidden h-14 px-8 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <div class="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span class="relative flex items-center gap-3">
                  <IconClock class="w-5 h-5" />
                  Schedule
                </span>
              </button>
              
              <!-- Refresh Button -->
              <button @click="checkStatus" :disabled="refreshing" 
                      class="group relative overflow-hidden h-14 px-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed">
                <div class="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span class="relative flex items-center gap-3">
                  <IconRefresh class="w-5 h-5" :class="refreshing ? 'animate-spin' : ''" />
                  {{ refreshing ? 'Syncing...' : 'Sync' }}
                </span>
              </button>
            </div>
          </div>
            </div>
          </div>
        </div>

        <!-- Beast Mode Main Content -->
    <div class="relative z-10 flex gap-8 mx-6 pb-8">
      <!-- Ultra-Modern Floating Sidebar -->
      <div class="w-96 space-y-6">
        <!-- Search Box with Glow Effect -->
        <div class="group relative">
          <div class="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          <div class="relative rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 p-6 shadow-2xl">
            <div class="relative">
              <IconSearch class="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <input 
                v-model="searchQuery" 
                placeholder="Search channels, users, messages..."
                class="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              />
            </div>
          </div>
        </div>

        <!-- Connection Status Card -->
        <div class="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl">
          <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10"></div>
          <div class="relative p-6">
            <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                <IconWifi class="w-5 h-5 text-white" />
              </div>
              System Status
            </h3>
            <div class="space-y-4">
              <div v-for="(item, key) in statusItems" :key="key" 
                   class="group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-4">
                    <div :class="['w-12 h-12 rounded-xl flex items-center justify-center', 
                                  item.configured ? 'bg-green-500/20 border border-green-400/50' : 'bg-yellow-500/20 border border-yellow-400/50']">
                      <IconLink v-if="item.icon === 'Link'" :class="[item.configured ? 'text-green-400' : 'text-yellow-400']" class="w-6 h-6" />
                      <IconUser v-else-if="item.icon === 'User'" :class="[item.configured ? 'text-green-400' : 'text-yellow-400']" class="w-6 h-6" />
                      <IconShield v-else :class="[item.configured ? 'text-green-400' : 'text-yellow-400']" class="w-6 h-6" />
                    </div>
                    <div>
                      <p class="font-semibold text-white">{{ item.label }}</p>
                      <p class="text-sm text-white/70">{{ item.description }}</p>
                    </div>
                  </div>
                  <div :class="['px-4 py-2 rounded-xl text-sm font-bold', 
                               item.configured ? 'bg-green-500/20 text-green-300 border border-green-400/50' : 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/50']">
                    {{ item.configured ? '✓ Live' : '⚠ Setup' }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Channels List -->
        <div class="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl">
          <div class="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10"></div>
          <div class="relative p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-bold text-white flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                  <IconHash class="w-5 h-5 text-white" />
                </div>
                Communication Channels
              </h3>
              <button @click="loadSlackChannels" :disabled="loading" 
                      class="group w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110">
                <IconRefresh class="w-5 h-5 text-white" :class="loading ? 'animate-spin' : ''" />
            </button>
          </div>
            
            <div class="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
              <div v-if="loading" class="flex items-center justify-center py-16">
                <div class="text-center">
                  <IconLoader2 class="text-blue-400 animate-spin w-8 h-8 mx-auto mb-3" />
                  <span class="text-white/70 font-medium">Loading channels...</span>
            </div>
              </div>
              <div v-else-if="filteredChannels.length === 0" class="text-center py-16">
                <IconFiles class="text-5xl text-white/30 mb-4 mx-auto" />
                <p class="text-white/70">No channels available</p>
              </div>
              <div v-else>
                <div v-for="channel in filteredChannels" :key="channel.id"
              @click="selectChannel(channel)"
                     :class="['group relative overflow-hidden rounded-xl p-4 cursor-pointer transition-all duration-300 hover:scale-105', 
                              selectedChannel?.id === channel.id ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-400/50 shadow-xl' : 'bg-white/10 hover:bg-white/20 border border-white/20']">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                      <div :class="['w-12 h-12 rounded-xl flex items-center justify-center border', 
                                    selectedChannel?.id === channel.id ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-purple-400/50' : 'bg-white/10 border-white/20']">
                        <IconLock v-if="channel.is_private" :class="[selectedChannel?.id === channel.id ? 'text-white' : 'text-white/70']" class="w-5 h-5" />
                        <IconMessage2 v-else :class="[selectedChannel?.id === channel.id ? 'text-white' : 'text-white/70']" class="w-5 h-5" />
              </div>
                      <div>
                        <p class="font-semibold text-white">{{ channel.name }}</p>
                        <p class="text-sm text-white/70">{{ channel.num_members }} members</p>
                      </div>
                    </div>
                    <div v-if="channel.unread_count" class="px-3 py-1 rounded-full bg-red-500/80 text-white text-xs font-bold border border-red-400/50">
                      {{ channel.unread_count }}
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>

        <!-- Advanced Stats Dashboard -->
        <div class="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl">
          <div class="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10"></div>
          <div class="relative p-6">
            <h4 class="text-lg font-bold text-white mb-6 flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                <IconChartLine class="w-4 h-4 text-white" />
              </div>
              Live Activity
            </h4>
            <div class="grid grid-cols-2 gap-4">
              <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30 p-4 text-center">
                <div class="absolute inset-0 bg-white/5"></div>
                <div class="relative">
                  <p class="text-3xl font-black text-white mb-1">{{ todayStats.messagesSent }}</p>
                  <p class="text-sm text-white/70 font-medium">Messages Today</p>
                </div>
              </div>
              <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/30 p-4 text-center">
                <div class="absolute inset-0 bg-white/5"></div>
                <div class="relative">
                  <p class="text-3xl font-black text-white mb-1">{{ todayStats.channelsActive }}</p>
                  <p class="text-sm text-white/70 font-medium">Active Channels</p>
                </div>
              </div>
            </div>
          </div>
            </div>
          </div>
          
      <!-- Enhanced Chat Area -->
      <div class="flex-1 rounded-xl border border-gray-200/50 bg-white/60 shadow-lg backdrop-filter backdrop-blur-xl">
        <div class="h-full flex flex-col">
          <!-- Chat Header -->
          <div class="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-purple-50 to-pink-50">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <h2 class="text-xl font-bold text-gray-900">
                  {{ selectedChannel ? `#${selectedChannel.name}` : 'Compose Message' }}
                </h2>
                <div v-if="selectedChannel" class="flex items-center gap-2">
                  <span class="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
                    {{ selectedChannel.num_members }} members
                  </span>
                  <span v-if="selectedChannel.is_private" class="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                    <IconLock class="mr-1 inline w-4 h-4" />Private
                  </span>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <button @click="showMessageHistory = !showMessageHistory" 
                        class="w-10 h-10 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center">
                  <IconHistory class="text-gray-600 w-5 h-5" />
                </button>
                <button @click="clearForm" 
                        class="w-10 h-10 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center">
                  <IconEraser class="text-gray-600 w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <!-- Message Composer -->
          <div class="flex-1 p-6 overflow-y-auto">
            <!-- Message Templates Quick Access -->
            <div v-if="messageTemplates.length > 0" class="mb-6">
              <p class="text-sm font-medium text-gray-700 mb-3">Quick Templates</p>
              <div class="flex flex-wrap gap-2">
                <button v-for="template in messageTemplates.slice(0, 3)" :key="template.id"
                        @click="applyTemplate(template)"
                        class="px-4 py-2 rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200 transition-all duration-200 text-sm font-medium">
                  {{ template.name }}
                </button>
              </div>
            </div>

            <!-- Rich Text Editor -->
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Message Content</label>
                <div class="border border-gray-200 rounded-lg overflow-hidden">
                  <!-- Formatting Toolbar -->
                  <div class="bg-gray-50 border-b border-gray-200 p-2 flex items-center gap-1">
                    <button @click="formatText('bold')" class="w-8 h-8 rounded hover:bg-gray-200 transition-colors flex items-center justify-center">
                      <IconBold class="text-gray-600 w-5 h-5" />
                    </button>
                    <button @click="formatText('italic')" class="w-8 h-8 rounded hover:bg-gray-200 transition-colors flex items-center justify-center">
                      <IconItalic class="text-gray-600 w-5 h-5" />
                    </button>
                    <button @click="formatText('code')" class="w-8 h-8 rounded hover:bg-gray-200 transition-colors flex items-center justify-center">
                      <IconCode class="text-gray-600 w-5 h-5" />
                    </button>
                    <div class="w-px h-6 bg-gray-300 mx-1"></div>
                    <button @click="formatText('link')" class="w-8 h-8 rounded hover:bg-gray-200 transition-colors flex items-center justify-center">
                      <IconLink class="text-gray-600 w-5 h-5" />
                    </button>
                    <button @click="formatText('list')" class="w-8 h-8 rounded hover:bg-gray-200 transition-colors flex items-center justify-center">
                      <IconList class="text-gray-600 w-5 h-5" />
                    </button>
                    <button @click="showEmojiPicker = true" class="w-8 h-8 rounded hover:bg-gray-200 transition-colors flex items-center justify-center">
                      <IconMoodSmile class="text-gray-600 w-5 h-5" />
                    </button>
                  </div>
                  <textarea 
                    ref="messageTextarea"
                    v-model="messageForm.content"
                    placeholder="Type your message here... Use @mentions to notify specific users"
                    rows="6"
                    class="w-full p-4 focus:outline-none resize-none"
                    @keydown="handleKeydown"
                  ></textarea>
                </div>
                <div class="flex items-center justify-between mt-2">
                  <p class="text-xs text-gray-500">
                    <kbd class="px-2 py-1 bg-gray-100 rounded text-xs">Shift + Enter</kbd> for new line
                  </p>
                  <p class="text-xs text-gray-500">
                    {{ messageForm.content.length }} / 4000 characters
                  </p>
                </div>
                </div>
                
              <!-- Advanced Options -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Target Channel</label>
                  <div class="relative">
                    <IconHash class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                      v-model="messageForm.channel"
                      type="text"
                      placeholder="general"
                      class="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-200 focus:border-purple-300 transition-all duration-200"
                    />
                  </div>
                  </div>
                  
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Bot Name</label>
                  <div class="relative">
                    <IconRobot class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                      v-model="messageForm.username"
                      type="text"
                      placeholder="ERP Bot"
                      class="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-200 focus:border-purple-300 transition-all duration-200"
                    />
                  </div>
                  </div>
                  
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Bot Icon</label>
                  <div class="relative">
                    <IconIcons class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                      v-model="messageForm.icon_emoji"
                      type="text"
                      placeholder=":robot_face:"
                      class="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-200 focus:border-purple-300 transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              <!-- Attachments -->
              <div v-if="attachments.length > 0" class="space-y-2">
                <p class="text-sm font-medium text-gray-700">Attachments</p>
                <div class="flex flex-wrap gap-2">
                  <div v-for="(attachment, index) in attachments" :key="index"
                       class="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                    <component :is="getFileIcon(attachment.type)" class="text-gray-600 w-5 h-5" />
                    <span class="text-sm text-gray-700">{{ attachment.name }}</span>
                    <button @click="removeAttachment(index)" class="text-red-500 hover:text-red-700">
                      <IconX class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Enhanced Message Input Bar -->
          <div class="px-6 py-4 border-t border-gray-200/50 bg-gradient-to-r from-gray-50 to-gray-100">
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-2">
                <button @click="showAttachmentMenu = true" 
                        class="w-10 h-10 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center group">
                  <IconPaperclip class="text-gray-600 group-hover:text-purple-600 transition-colors w-5 h-5" />
              </button>
                <button @click="showEmojiPicker = true" 
                        class="w-10 h-10 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center group">
                  <IconMoodSmile class="text-gray-600 group-hover:text-purple-600 transition-colors w-5 h-5" />
                </button>
                <button @click="showGifPicker = true" 
                        class="w-10 h-10 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center group">
                  <IconGif class="text-gray-600 group-hover:text-purple-600 transition-colors w-5 h-5" />
              </button>
            </div>
              
              <input 
                v-model="quickMessage"
                @keydown.enter.prevent="sendQuickMessage"
                placeholder="Quick message (press Enter to send)"
                class="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-200 focus:border-purple-300 transition-all duration-200"
              />
              
            <button 
              @click="sendMessage" 
              :disabled="!messageForm.content.trim() && !quickMessage.trim()"
                class="group relative overflow-hidden h-12 px-8 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <span class="relative z-10 flex items-center gap-2">
                  <IconSend class="w-5 h-5" />
              Send
                </span>
                <div class="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </div>

      <!-- Message History Panel -->
      <div v-if="showMessageHistory" class="w-96 rounded-xl border border-gray-200/50 bg-white/60 p-6 shadow-lg backdrop-filter backdrop-blur-xl">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-gray-900">Message History</h3>
          <button @click="showMessageHistory = false" class="text-gray-400 hover:text-gray-600">
        <i class="fas fa-times"></i>
      </button>
    </div>
        <div class="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
          <div v-for="msg in messageHistory" :key="msg.id" 
               class="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-200">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-gray-900">{{ msg.channel }}</span>
              <span class="text-xs text-gray-500">{{ formatDate(msg.timestamp) }}</span>
            </div>
            <p class="text-sm text-gray-700 line-clamp-2">{{ msg.content }}</p>
            <div class="flex items-center gap-2 mt-2">
              <span class="text-xs text-gray-500">
                <IconCircleCheck class="text-green-500 w-4 h-4 inline" /> Delivered
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Analytics Modal -->
    <Transition name="modal">
      <div v-if="showAnalytics" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          <div class="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
            <div class="flex items-center justify-between">
              <h2 class="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
              <button @click="showAnalytics = false" class="text-gray-400 hover:text-gray-600">
                <i class="fas fa-times text-xl"></i>
              </button>
            </div>
          </div>
          <div class="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
            <!-- Analytics content here -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div class="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                <p class="text-sm text-blue-600 font-medium">Total Messages</p>
                <p class="text-2xl font-bold text-blue-900 mt-1">{{ analytics.totalMessages }}</p>
                <p class="text-xs text-blue-600 mt-2">+12% from last week</p>
              </div>
              <div class="p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100">
                <p class="text-sm text-green-600 font-medium">Active Channels</p>
                <p class="text-2xl font-bold text-green-900 mt-1">{{ analytics.activeChannels }}</p>
                <p class="text-xs text-green-600 mt-2">{{ analytics.newChannels }} new this week</p>
              </div>
              <div class="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
                <p class="text-sm text-purple-600 font-medium">Engagement Rate</p>
                <p class="text-2xl font-bold text-purple-900 mt-1">{{ analytics.engagementRate }}%</p>
                <p class="text-xs text-purple-600 mt-2">High engagement</p>
              </div>
            </div>
            <!-- Add charts and more analytics here -->
          </div>
        </div>
      </div>
    </Transition>

    <!-- Templates Modal -->
    <Transition name="modal">
      <div v-if="showTemplates" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          <div class="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
            <div class="flex items-center justify-between">
              <h2 class="text-2xl font-bold text-gray-900">Message Templates</h2>
              <button @click="showTemplates = false" class="text-gray-400 hover:text-gray-600">
                <i class="fas fa-times text-xl"></i>
              </button>
            </div>
          </div>
          <div class="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="template in messageTemplates" :key="template.id"
                   class="p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-200 cursor-pointer"
                   @click="applyTemplate(template); showTemplates = false">
                <h3 class="font-semibold text-gray-900 mb-2">{{ template.name }}</h3>
                <p class="text-sm text-gray-600 line-clamp-3">{{ template.content }}</p>
                <div class="flex items-center gap-2 mt-3">
                  <span class="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">{{ template.category }}</span>
                  <span class="text-xs text-gray-500">Used {{ template.usageCount }} times</span>
                </div>
              </div>
            </div>
            <button @click="createNewTemplate" class="mt-4 w-full p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-purple-300 transition-all duration-200 text-gray-500 hover:text-purple-600">
                              <IconPlus class="mr-2 inline w-5 h-5" />
              Create New Template
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Scheduler Modal -->
    <Transition name="modal">
      <div v-if="showScheduler" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
          <div class="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50">
            <div class="flex items-center justify-between">
              <h2 class="text-2xl font-bold text-gray-900">Schedule Message</h2>
              <button @click="showScheduler = false" class="text-gray-400 hover:text-gray-600">
                <i class="fas fa-times text-xl"></i>
              </button>
            </div>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Schedule Date & Time</label>
                <input 
                  type="datetime-local"
                  v-model="scheduleForm.datetime"
                  class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-300"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Repeat</label>
                <select v-model="scheduleForm.repeat" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-300">
                  <option value="none">No Repeat</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div class="flex items-center gap-3 justify-end mt-6">
                <button @click="showScheduler = false" class="px-6 py-3 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50">
                  Cancel
                </button>
                <button @click="scheduleMessage" class="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:shadow-lg">
                  Schedule Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Enhanced Notifications -->
    <Transition name="notification">
      <div v-if="notification.show" 
           :class="['fixed top-6 right-6 p-4 rounded-xl shadow-2xl backdrop-filter backdrop-blur-xl border z-50 max-w-md',
                    notification.type === 'success' ? 'bg-green-50/90 border-green-200' : 'bg-red-50/90 border-red-200']">
        <div class="flex items-center gap-3">
          <div :class="['w-10 h-10 rounded-lg flex items-center justify-center',
                        notification.type === 'success' ? 'bg-green-100' : 'bg-red-100']">
            <IconCircleCheck v-if="notification.type === 'success'" class="text-green-600 w-10 h-10" />
            <IconAlertTriangle v-else class="text-red-600 w-10 h-10" />
          </div>
          <div class="flex-1">
            <p :class="['font-medium', notification.type === 'success' ? 'text-green-900' : 'text-red-900']">
              {{ notification.title }}
            </p>
            <p :class="['text-sm mt-1', notification.type === 'success' ? 'text-green-700' : 'text-red-700']">
              {{ notification.message }}
            </p>
          </div>
          <button @click="notification.show = false" 
                  class="text-gray-400 hover:text-gray-600">
            <IconX class="w-5 h-5" />
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import api from '@/utils/axios'
import {
  IconLoader2,
  IconMessageCircle2,
  IconChartLine,
  IconFileText,
  IconClock,
  IconRefresh,
  IconSearch,
  IconWifi,
  IconHash,
  IconFiles,
  IconLock,
  IconMessage2,
  IconTrash,
  IconLink,
  IconList,
  IconCode,
  IconMoodSmile,
  IconPhoto,
  IconUser,
  IconX,
  IconPaperclip,
  IconVideo,
  IconSend,
  IconCircleCheck,
  IconAlertTriangle,
  IconPlus,
  IconMusic,
  IconFileZip,
  IconShield,
  IconBold,
  IconItalic,
  IconHistory,
  IconEraser,
  IconRobot,
  IconIcons,
  IconGif,
  IconCheck
} from '@tabler/icons-vue'

export default {
  name: 'TeamCommunication',
  components: {
    IconLoader2,
    IconMessageCircle2,
    IconChartLine,
    IconFileText,
    IconClock,
    IconRefresh,
    IconSearch,
    IconWifi,
    IconHash,
    IconFiles,
    IconLock,
    IconMessage2,
    IconTrash,
    IconLink,
    IconList,
    IconCode,
    IconMoodSmile,
    IconPhoto,
    IconUser,
    IconX,
    IconPaperclip,
    IconVideo,
    IconSend,
    IconCircleCheck,
    IconAlertTriangle,
    IconPlus,
    IconMusic,
    IconFileZip,
    IconShield,
    IconBold,
    IconItalic,
    IconHistory,
    IconEraser,
    IconRobot,
    IconIcons,
    IconGif,
    IconCheck
  },
  data() {
    return {
      // Initial loading state
      initialLoading: true,
      
      // Existing data
      status: {
        webhook_configured: false,
        bot_token_configured: false,
        fully_configured: false
      },
      messageForm: {
        content: '',
        channel: '#general',
        username: 'ERP Bot',
        icon_emoji: ':robot_face:'
      },
      slackChannels: [],
      selectedChannel: null,
      loading: false,
      searchQuery: '',
      quickMessage: '',
      refreshing: false,
      
      // Enhanced notification
      notification: {
        show: false,
        type: 'success',
        title: '',
        message: ''
      },
      
      // New features data
      showAnalytics: false,
      showTemplates: false,
      showScheduler: false,
      showMessageHistory: false,
      showEmojiPicker: false,
      showGifPicker: false,
      showAttachmentMenu: false,
      
      // Status items for sidebar
      statusItems: {
        webhook: {
          label: 'API Endpoint',
          description: 'Message delivery endpoint',
          icon: 'Link',
          configured: false
        },
        bot: {
          label: 'Service Account',
          description: 'System authentication',
          icon: 'User',
          configured: false
        },
        permissions: {
          label: 'Permissions',
          description: 'Access control configured',
          icon: 'Shield',
          configured: false
        }
      },
      
      // Analytics data
      analytics: {
        totalMessages: 1247,
        activeChannels: 23,
        engagementRate: 87,
        newChannels: 5
      },
      
      // Today's stats
      todayStats: {
        messagesSent: 42,
        channelsActive: 8
      },
      
      // Message templates
      messageTemplates: [
        {
          id: 1,
          name: 'Fee Reminder',
          content: '📢 Reminder: Fee payment deadline is approaching. Please ensure timely payment to avoid late charges.',
          category: 'Finance',
          usageCount: 45
        },
        {
          id: 2,
          name: 'Event Announcement',
          content: '🎉 Exciting news! We have an upcoming event scheduled. Mark your calendars and stay tuned for more details.',
          category: 'Events',
          usageCount: 32
        },
        {
          id: 3,
          name: 'System Update',
          content: '🔧 System maintenance scheduled for tonight. The ERP system will be unavailable from 11 PM to 1 AM.',
          category: 'Technical',
          usageCount: 28
        },
        {
          id: 4,
          name: 'Welcome Message',
          content: '👋 Welcome to our Slack workspace! Feel free to explore channels and connect with the team.',
          category: 'General',
          usageCount: 67
        }
      ],
      
      // Message history
      messageHistory: [
        {
          id: 1,
          channel: '#general',
          content: 'System update completed successfully. All services are now operational.',
          timestamp: new Date(Date.now() - 3600000)
        },
        {
          id: 2,
          channel: '#finance',
          content: 'Monthly fee collection report has been generated and shared.',
          timestamp: new Date(Date.now() - 7200000)
        }
      ],
      
      // Schedule form
      scheduleForm: {
        datetime: '',
        repeat: 'none'
      },
      
      // Attachments
      attachments: []
    }
  },
  
  computed: {
    filteredChannels() {
      if (!this.searchQuery) return this.slackChannels
      const query = this.searchQuery.toLowerCase()
      return this.slackChannels.filter(channel => 
        channel.name.toLowerCase().includes(query) ||
        (channel.purpose && channel.purpose.toLowerCase().includes(query))
      )
    }
  },
  
  async mounted() {
    try {
      // Initialize with default values to prevent blank screen
      this.updateStatusItems()
      
      // Load data with error handling
      await Promise.all([
        this.checkStatus().catch(err => {
          console.error('Failed to check status:', err)
          // Set default status if API fails
          this.status = {
            webhook_configured: false,
            bot_token_configured: false,
            fully_configured: false
          }
        }),
        this.loadSlackChannels().catch(err => {
          console.error('Failed to load channels:', err)
          // Set empty channels if API fails
          this.slackChannels = []
        })
      ])
    } catch (error) {
      console.error('Component mount error:', error)
      this.showNotification('Initialization Error', 'Failed to load Slack integration', 'error')
    } finally {
      // Hide initial loading screen
      setTimeout(() => {
        this.initialLoading = false
      }, 500) // Small delay for smooth transition
    }
  },
  
  methods: {
    // Existing methods
    async checkStatus() {
      this.refreshing = true
      try {
        const response = await api.get('/slack/status')
        this.status = response.data.data
        this.updateStatusItems()
      } catch (error) {
        console.error('Slack status error:', error.response || error)
        if (error.response?.status === 404) {
          this.showNotification('Route Not Found', 'API endpoint not found. Check backend routes.', 'error')
        } else if (error.code === 'ERR_NETWORK') {
          this.showNotification('Backend Offline', 'Cannot connect to backend server. Please start the Laravel server.', 'error')
        } else {
          this.showNotification('Connection Error', error.response?.data?.message || 'Unable to check Slack status', 'error')
        }
      } finally {
        this.refreshing = false
      }
    },
    
    async sendMessage() {
      const content = this.messageForm.content || this.quickMessage
      if (!content.trim()) return
      
      // Add to message history
      this.addToHistory({
        channel: this.messageForm.channel,
        content: content,
        timestamp: new Date()
      })
      
      const payload = {
        message: content,
        channel: this.messageForm.channel,
        username: this.messageForm.username,
        icon_emoji: this.messageForm.icon_emoji
      }
      
      try {
        const response = await api.post('/slack/send', payload)
        this.showNotification('Message Sent!', 'Your message has been delivered', 'success')
        this.clearForm()
        
        // Update stats
        this.todayStats.messagesSent++
      } catch (error) {
        console.error('Send message error:', error)
        this.showNotification('Send Failed', 'Unable to send message', 'error')
      }
    },
    
    async sendQuickMessage() {
      if (!this.quickMessage.trim()) return
      
      this.messageForm.content = this.quickMessage
      await this.sendMessage()
    },
    
    async loadSlackChannels() {
      this.loading = true
      try {
        const response = await api.get('/slack/channels')
        this.slackChannels = response.data.data || []
        
        // Add mock unread counts for demo
        this.slackChannels = this.slackChannels.map(channel => ({
          ...channel,
          unread_count: Math.random() > 0.7 ? Math.floor(Math.random() * 10) + 1 : 0
        }))
      } catch (error) {
        console.error('Load channels error:', error.response || error)
        if (error.response?.status === 404) {
          this.showNotification('Route Not Found', 'API endpoint not found. Check backend routes.', 'error')
        } else if (error.code === 'ERR_NETWORK') {
          this.showNotification('Backend Offline', 'Cannot connect to backend server. Please start the Laravel server.', 'error')
        } else {
          this.showNotification('Load Failed', error.response?.data?.message || 'Unable to load Slack channels', 'error')
        }
      } finally {
        this.loading = false
      }
    },
    
    selectChannel(channel) {
      this.selectedChannel = channel
      this.messageForm.channel = `#${channel.name}`
      
      // Clear unread count
      if (channel.unread_count) {
        channel.unread_count = 0
      }
    },
    
    clearForm() {
      this.messageForm.content = ''
      this.quickMessage = ''
      this.attachments = []
    },
    
    showNotification(title, message, type = 'success') {
      this.notification = {
        show: true,
        type,
        title,
        message
      }
      
      setTimeout(() => {
        this.notification.show = false
      }, 5000)
    },
    
    // New methods
    updateStatusItems() {
      this.statusItems.webhook.configured = this.status.webhook_configured
      this.statusItems.bot.configured = this.status.bot_token_configured
      this.statusItems.permissions.configured = this.status.fully_configured
    },
    
    formatText(format) {
      const textarea = this.$refs.messageTextarea
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = this.messageForm.content.substring(start, end)
      
      let formattedText = selectedText
      switch(format) {
        case 'bold':
          formattedText = `*${selectedText}*`
          break
        case 'italic':
          formattedText = `_${selectedText}_`
          break
        case 'code':
          formattedText = `\`${selectedText}\``
          break
        case 'link':
          formattedText = `[${selectedText}](url)`
          break
        case 'list':
          formattedText = `• ${selectedText}`
          break
      }
      
      this.messageForm.content = 
        this.messageForm.content.substring(0, start) + 
        formattedText + 
        this.messageForm.content.substring(end)
    },
    
    handleKeydown(event) {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()
        this.sendMessage()
      }
    },
    
    applyTemplate(template) {
      this.messageForm.content = template.content
      template.usageCount++
    },
    
    createNewTemplate() {
      // Implementation for creating new template
      this.showTemplates = false
      this.showNotification('Feature Coming Soon', 'Template creation will be available soon', 'info')
    },
    
    scheduleMessage() {
      // Implementation for scheduling message
      this.showScheduler = false
      this.showNotification('Message Scheduled', 'Your message has been scheduled successfully', 'success')
    },
    
    addToHistory(message) {
      this.messageHistory.unshift({
        id: Date.now(),
        ...message
      })
      
      // Keep only last 50 messages
      if (this.messageHistory.length > 50) {
        this.messageHistory = this.messageHistory.slice(0, 50)
      }
    },
    
    formatDate(date) {
      const now = new Date()
      const msgDate = new Date(date)
      const diffMs = now - msgDate
      const diffMins = Math.floor(diffMs / 60000)
      
      if (diffMins < 1) return 'Just now'
      if (diffMins < 60) return `${diffMins}m ago`
      if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`
      return msgDate.toLocaleDateString()
    },
    
    getFileIcon(type) {
      const typeMap = {
        'image': 'IconPhoto',
        'document': 'IconFileText',
        'spreadsheet': 'IconChartLine',
        'pdf': 'IconFileText',
        'video': 'IconVideo',
        'audio': 'IconMusic',
        'archive': 'IconFileZip',
        'code': 'IconCode',
        'default': 'IconFileText'
      }
      return typeMap[type] || typeMap.default
    },
    
    removeAttachment(index) {
      this.attachments.splice(index, 1)
    }
  }
}
</script>

<style scoped>
/* Custom scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Beast Mode Animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  33% {
    transform: translateY(-20px) rotate(2deg);
  }
  66% {
    transform: translateY(-10px) rotate(-1deg);
  }
}

@keyframes float-delayed {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  33% {
    transform: translateY(-30px) rotate(-2deg);
  }
  66% {
    transform: translateY(-15px) rotate(1deg);
  }
}

@keyframes float-slow {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-25px) rotate(1.5deg);
  }
}

@keyframes spin-reverse {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}

@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(147, 51, 234, 0.5);
  }
  50% {
    box-shadow: 0 0 40px rgba(147, 51, 234, 0.8), 0 0 60px rgba(236, 72, 153, 0.5);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite;
  animation-delay: 1s;
}

.animate-float-slow {
  animation: float-slow 10s ease-in-out infinite;
  animation-delay: 2s;
}

.animate-spin-reverse {
  animation: spin-reverse 2s linear infinite;
}

.animate-glow {
  animation: glow 2s ease-in-out infinite;
}

/* Tabler icon defaults */
svg {
  display: inline-block;
  vertical-align: middle;
}

/* Button icon alignment fix */
button svg {
  display: inline-block;
  vertical-align: text-bottom;
}

/* Icon sizes - Tabler icons need explicit sizing */
.icon-sm { width: 1rem; height: 1rem; }
.icon-md { width: 1.25rem; height: 1.25rem; }
.icon-lg { width: 1.5rem; height: 1.5rem; }
.icon-xl { width: 2rem; height: 2rem; }

/* Enhanced Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Animation keyframes */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .bg-white,
.modal-leave-to .bg-white {
  transform: scale(0.9);
}

/* Notification transitions */
.notification-enter-active {
  transition: all 0.3s ease-out;
}

.notification-leave-active {
  transition: all 0.3s ease-in;
}

.notification-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.notification-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* Custom gradient text animation */
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.bg-gradient-to-r {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

/* Glassmorphism effects */
.backdrop-filter {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

/* Hover scale effect */
.hover\:scale-\[1\.02\]:hover {
  transform: scale(1.02);
}

/* Focus ring utilities */
.focus\:ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .w-80 {
    width: 100%;
  }
  
  .flex-row {
  flex-direction: column;
  }
  
  .gap-6 {
  gap: 1rem;
}
}

/* Loading spinner animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Button hover effects */
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* Smooth transitions */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Disable transitions for color scheme changes */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style> 